"use client";

import { useState, useEffect } from 'react';
import { Play, Pause, Settings, BarChart3, Zap, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface AutomationStatus {
  isRunning: boolean;
  config: {
    keywords: string[];
    maxArticlesPerKeyword: number;
    publishingInterval: number;
    enableAutoPublishing: boolean;
  };
  nextRunTime?: string;
}

export default function AdminPage() {
  const [status, setStatus] = useState<AutomationStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/automation');
      const data = await response.json();
      if (data.success) {
        setStatus(data.status);
      }
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  const handleAction = async (action: string) => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/automation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        await fetchStatus();
      } else {
        setMessage({ type: 'error', text: data.error || 'Action failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const runOnce = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/automation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'run-once' }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage({ 
          type: 'success', 
          text: `Generated ${data.result.articlesGenerated} articles` 
        });
      } else {
        setMessage({ type: 'error', text: data.error || 'Generation failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error occurred' });
    } finally {
      setLoading(false);
    }
  };

  if (!status) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-8 rounded-xl backdrop-blur-md">
          <div className="animate-spin w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-gray-300 mt-4 text-center">Loading automation status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold futuristic-text mb-4">
              Automation Control Center
            </h1>
            <p className="text-gray-300 text-lg">
              Manage automated content generation and publishing
            </p>
          </div>

          {/* Status Card */}
          <div className="glass-card p-8 rounded-xl mb-8 backdrop-blur-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white flex items-center">
                <Zap className="w-6 h-6 mr-2 text-blue-400" />
                System Status
              </h2>
              <div className={`flex items-center px-4 py-2 rounded-full ${
                status.isRunning 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {status.isRunning ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Running
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Stopped
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">
                  {status.config.keywords.length}
                </div>
                <div className="text-gray-400">Active Keywords</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-2">
                  {status.config.maxArticlesPerKeyword}
                </div>
                <div className="text-gray-400">Articles per Keyword</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-2">
                  {status.config.publishingInterval}m
                </div>
                <div className="text-gray-400">Publishing Interval</div>
              </div>
            </div>

            {status.nextRunTime && (
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <div className="flex items-center text-blue-400">
                  <Clock className="w-4 h-4 mr-2" />
                  Next automated run: {new Date(status.nextRunTime).toLocaleString()}
                </div>
              </div>
            )}
          </div>

          {/* Message Display */}
          {message && (
            <div className={`p-4 rounded-lg mb-6 ${
              message.type === 'success' 
                ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                : 'bg-red-500/20 border border-red-500/30 text-red-400'
            }`}>
              {message.text}
            </div>
          )}

          {/* Control Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => handleAction(status.isRunning ? 'stop' : 'start')}
              disabled={loading}
              className={`glass-card p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                status.isRunning 
                  ? 'hover:border-red-500/50' 
                  : 'hover:border-green-500/50'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="text-center">
                {status.isRunning ? (
                  <Pause className="w-8 h-8 mx-auto mb-3 text-red-400" />
                ) : (
                  <Play className="w-8 h-8 mx-auto mb-3 text-green-400" />
                )}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {status.isRunning ? 'Stop' : 'Start'} Automation
                </h3>
                <p className="text-gray-400 text-sm">
                  {status.isRunning 
                    ? 'Stop automated content generation'
                    : 'Start automated content generation'
                  }
                </p>
              </div>
            </button>

            <button
              onClick={runOnce}
              disabled={loading}
              className={`glass-card p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:border-blue-500/50 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <div className="text-center">
                <Zap className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Generate Now
                </h3>
                <p className="text-gray-400 text-sm">
                  Run content generation once
                </p>
              </div>
            </button>

            <button
              onClick={() => window.location.href = '/admin/settings'}
              className="glass-card p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:border-purple-500/50"
            >
              <div className="text-center">
                <Settings className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Settings
                </h3>
                <p className="text-gray-400 text-sm">
                  Configure automation parameters
                </p>
              </div>
            </button>
          </div>

          {/* Keywords Display */}
          <div className="glass-card p-8 rounded-xl">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
              Active Keywords
            </h3>
            <div className="flex flex-wrap gap-3">
              {status.config.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-400 text-sm rounded-full border border-blue-500/30"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}