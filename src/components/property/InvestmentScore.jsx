import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { TrendingUp, TrendingDown, BarChart, Award } from 'lucide-react';

const InvestmentScore = ({ score = {}, className = '' }) => {
  const {
    score: overallScore = 0,
    roi = 0,
    appreciation = 0,
    rentalYield = 0,
    marketTrend = 'up',
  } = score;

  const getScoreColor = (value) => {
    if (value >= 80) return 'text-green-500';
    if (value >= 60) return 'text-gold-500';
    if (value >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBg = (value) => {
    if (value >= 80) return 'bg-green-50 border-green-200';
    if (value >= 60) return 'bg-gold-50 border-gold-200';
    if (value >= 40) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <BarChart className="w-4 h-4 text-gold-500" />;
  };

  const getTrendLabel = (trend) => {
    if (trend === 'up') return 'Growing Market';
    if (trend === 'down') return 'Declining Market';
    return 'Stable Market';
  };

  const getRatingLabel = (value) => {
    if (value >= 80) return 'Excellent Investment';
    if (value >= 60) return 'Good Investment';
    if (value >= 40) return 'Moderate Investment';
    return 'Caution Advised';
  };

  if (!overallScore) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'bg-white rounded-2xl p-6 shadow-premium border',
        getScoreBg(overallScore),
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-playfair font-semibold text-navy-800">Investment Score</h2>
          <p className="text-sm text-navy-500">Overall investment potential assessment</p>
        </div>
        <Award className="w-6 h-6 text-gold-500" />
      </div>

      <div className="mt-4 flex items-center gap-6">
        {/* Score Circle */}
        <div className="relative w-20 h-20 flex-shrink-0">
          <svg className="w-20 h-20 -rotate-90">
            <circle cx="40" cy="40" r="32" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <circle
              cx="40"
              cy="40"
              r="32"
              fill="none"
              stroke={overallScore >= 80 ? '#10b981' : overallScore >= 60 ? '#c9a84c' : '#f59e0b'}
              strokeWidth="8"
              strokeDasharray={`${(overallScore / 100) * 201} 201`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-playfair font-bold text-navy-800">{overallScore}</span>
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-navy-500">ROI</p>
            <p className="text-lg font-semibold text-navy-800">{roi}%</p>
          </div>
          <div>
            <p className="text-xs text-navy-500">Appreciation</p>
            <p className="text-lg font-semibold text-navy-800">{appreciation}%</p>
          </div>
          <div>
            <p className="text-xs text-navy-500">Rental Yield</p>
            <p className="text-lg font-semibold text-navy-800">{rentalYield}%</p>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-xs text-navy-500">Market</p>
            <div className="flex items-center gap-1">
              {getTrendIcon(marketTrend)}
              <span className="text-sm font-medium text-navy-800">
                {getTrendLabel(marketTrend)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-navy-100">
        <p className="text-sm font-medium text-navy-800">{getRatingLabel(overallScore)}</p>
        <p className="text-xs text-navy-500 mt-1">
          Based on market data, historical trends, and property attributes.
        </p>
      </div>
    </motion.div>
  );
};

export default InvestmentScore;
