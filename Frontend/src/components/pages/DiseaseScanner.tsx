import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Upload, X, Loader, MapPin, AlertTriangle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface PredictionResult {
  disease: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  treatment: string[];
  prevention: string[];
}

export default function DiseaseScanner() {
  const { t } = useApp();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [cropName, setCropName] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [reportError, setReportError] = useState<string | null>(null);

  const fetchWithFallback = async (url: string, options?: RequestInit, fallbackBase?: string) => {
    try {
      return await fetch(url, options);
    } catch (err) {
      if (fallbackBase && !url.startsWith('http')) {
        return await fetch(`${fallbackBase}${url}`, options);
      }
      throw err;
    }
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setSelectedFile(file);
      setResult(null);
      setShowMap(false);
      setError(null);
      setReportError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const getAdvice = (disease: string) => {
    const key = disease.toLowerCase();
    if (key.includes('blight')) {
      return {
        treatment: [
          'Remove and destroy infected plant parts immediately',
          'Apply copper-based fungicide (Bordeaux mixture)',
          'Improve air circulation around plants',
        ],
        prevention: [
          'Use disease-resistant varieties',
          'Avoid overhead watering',
          'Maintain proper plant spacing',
          'Regular crop rotation',
        ],
      };
    }
    if (key.includes('mildew')) {
      return {
        treatment: [
          'Apply sulfur or potassium bicarbonate sprays',
          'Remove heavily infected leaves',
        ],
        prevention: [
          'Improve airflow around plants',
          'Avoid wetting foliage late in the day',
        ],
      };
    }
    return {
      treatment: ['General care: inspect plant and consult an agronomist'],
      prevention: ['Maintain field hygiene and monitor regularly'],
    };
  };

  const analyzeCrop = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      const resp = await fetchWithFallback('/predict-image', {
        method: 'POST',
        body: formData,
      }, 'http://127.0.0.1:5000');
      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data?.error || 'Prediction failed');
      }

      const severity = String(data.severity || 'unknown').toLowerCase() as 'low' | 'medium' | 'high';
      const { treatment, prevention } = getAdvice(data.disease || 'unknown');

      const apiResult: PredictionResult = {
        disease: data.disease || 'Unknown',
        confidence: Number(data.confidence_percent || 0),
        severity,
        treatment,
        prevention,
      };

      setResult(apiResult);

      // create report in backend (non-blocking for UI)
      try {
        const reportResp = await fetchWithFallback('/api/reports', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            crop: cropName || 'Unknown',
            disease: apiResult.disease,
            severity: apiResult.severity,
            confidence: apiResult.confidence,
            location: location || 'Unknown',
          }),
        }, 'http://127.0.0.1:6000');
        if (!reportResp.ok) {
          const reportData = await reportResp.json().catch(() => ({}));
          setReportError(reportData?.error || 'Report saving failed');
        }
      } catch (e: any) {
        setReportError(e?.message || 'Report saving failed');
      }
    } catch (e: any) {
      setError(e?.message || 'Prediction failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'from-red-500 to-red-600';
      case 'medium':
        return 'from-orange-500 to-orange-600';
      case 'low':
        return 'from-yellow-500 to-yellow-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      case 'medium':
        return 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300';
      case 'low':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {t('diseaseScanner')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Upload an image of your crop to detect diseases instantly
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {!selectedImage ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-3 border-dashed rounded-2xl p-12 text-center transition-colors ${
                  isDragging
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                }`}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl">
                    <Upload className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {t('dragDrop')}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <label className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-semibold cursor-pointer hover:bg-green-600 transition-colors">
                      <Upload className="w-5 h-5" />
                      {t('uploadImage')}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                    <label className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold cursor-pointer hover:bg-blue-600 transition-colors">
                      <Camera className="w-5 h-5" />
                      {t('takePhoto')}
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Selected crop"
                    className="w-full h-80 object-cover rounded-xl"
                  />
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setResult(null);
                      setShowMap(false);
                    }}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {!result && (
                  <button
                    onClick={analyzeCrop}
                    disabled={isAnalyzing}
                    className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        {t('analyzing')}
                      </>
                    ) : (
                      <>
                        <Camera className="w-5 h-5" />
                        {t('predict')}
                      </>
                    )}
                  </button>
                )}

                {!result && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={cropName}
                      onChange={(e) => setCropName(e.target.value)}
                      placeholder="Crop name (optional)"
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Location (optional)"
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                )}

                {error && (
                  <p className="mt-4 text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                )}
                {reportError && (
                  <p className="mt-2 text-sm text-orange-600 dark:text-orange-400">
                    {reportError}
                  </p>
                )}
              </div>
            )}
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {result ? (
              <>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {t('results')}
                    </h2>
                    <span className={`px-4 py-1 rounded-full text-sm font-semibold ${getSeverityBadgeColor(result.severity)}`}>
                      {t(result.severity)} {t('severity')}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-orange-500" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {t('diseaseName')}
                        </h3>
                      </div>
                      <p className="text-lg font-bold text-red-600 dark:text-red-400">
                        {result.disease}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {t('confidence')}
                      </h3>
                      <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.confidence}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className={`h-full bg-gradient-to-r ${getSeverityColor(result.severity)}`}
                        />
                      </div>
                      <p className="text-right mt-1 font-semibold text-gray-900 dark:text-white">
                        {result.confidence}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4">
                    {t('treatment')}
                  </h3>
                  <ul className="space-y-3">
                    {result.treatment.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-3"
                      >
                        <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4">
                    {t('prevention')}
                  </h3>
                  <ul className="space-y-3">
                    {result.prevention.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-3"
                      >
                        <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setShowMap(!showMap)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                >
                  <MapPin className="w-5 h-5" />
                  {t('findNearbyHelp')}
                </button>

                {showMap && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg overflow-hidden"
                  >
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d30770.014526634895!2d73.78584!3d18.52043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sagriculture%20centers!5e0!3m2!1sen!2sin!4v1234567890"
                      width="100%"
                      height="300"
                      style={{ border: 0, borderRadius: '12px' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Nearby Agriculture Centers"
                    />
                  </motion.div>
                )}
              </>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg text-center">
                <div className="bg-gray-100 dark:bg-gray-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Upload an image to see results
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
