import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { formatCurrency } from '@/lib/formatters';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Calculator, ChevronDown, ChevronUp } from 'lucide-react';

const MortgageCalculator = ({ price = 0, className = '' }) => {
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [isExpanded, setIsExpanded] = useState(true);
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateMortgage = () => {
    const downPayment = price * (downPaymentPercent / 100);
    const loanAmount = price - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    let payment = 0;
    if (loanAmount > 0 && interestRate > 0) {
      payment =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    } else if (loanAmount > 0) {
      payment = loanAmount / numberOfPayments;
    }

    setMonthlyPayment({
      monthly: payment,
      totalPayment: payment * numberOfPayments,
      totalInterest: payment * numberOfPayments - loanAmount,
      loanAmount,
      downPayment,
    });
  };

  const formatCurrencyShort = (value) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return formatCurrency(value);
  };

  return (
    <div className={cn('bg-white rounded-2xl p-4 sm:p-6 shadow-premium', className)}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-gold-500" />
          <span className="font-semibold text-navy-800">Mortgage Calculator</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-navy-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-navy-400" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Down Payment"
                  type="number"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  suffix="%"
                  min={0}
                  max={100}
                />
                <div className="pt-6 text-sm text-navy-500">
                  {formatCurrency(price * (downPaymentPercent / 100))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Interest Rate"
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  suffix="%"
                  step={0.1}
                  min={0}
                  max={20}
                />
                <Input
                  label="Loan Term"
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  suffix="Years"
                  min={1}
                  max={50}
                />
              </div>

              <Button variant="luxury" size="md" onClick={calculateMortgage} className="w-full">
                Calculate Payment
              </Button>

              {monthlyPayment && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-gold-50 rounded-xl border border-gold-200"
                >
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-xs text-navy-500">Monthly Payment</p>
                      <p className="text-2xl font-playfair font-bold text-gold-600">
                        {formatCurrency(monthlyPayment.monthly)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-navy-500">Total Payment</p>
                      <p className="text-lg font-semibold text-navy-800">
                        {formatCurrencyShort(monthlyPayment.totalPayment)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-navy-500">Total Interest</p>
                      <p className="text-lg font-semibold text-navy-800">
                        {formatCurrencyShort(monthlyPayment.totalInterest)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-navy-500">Loan Amount</p>
                      <p className="text-lg font-semibold text-navy-800">
                        {formatCurrencyShort(monthlyPayment.loanAmount)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <p className="text-xs text-navy-400 text-center">
                * Estimated monthly payment including principal and interest only.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MortgageCalculator;
