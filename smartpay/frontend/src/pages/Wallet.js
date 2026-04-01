import React, { useMemo } from 'react';
import Card from '../components/common/Card';
import StatCard from '../components/common/StatCard';
import ProgressBar from '../components/common/ProgressBar';
import { useSmartPay } from '../context/SmartPayContext_new';
import { formatCurrency } from '../utils/helpers';

export default function PortfolioPage({ darkMode }) {
  const { wallet, expenses } = useSmartPay();

  // Simulated stock portfolio - diversified index portfolio
  const mockStocks = useMemo(() => [
    { symbol: 'TCS', name: 'Tata Consultancy', allocation: 0.25, price: 3850.50, basePrice: 3240 },
    { symbol: 'INFY', name: 'Infosys', allocation: 0.20, price: 1545.30, basePrice: 1400 },
    { symbol: 'HDFC', name: 'HDFC Bank', allocation: 0.20, price: 1685.45, basePrice: 1450 },
    { symbol: 'SBI', name: 'State Bank', allocation: 0.15, price: 685.20, basePrice: 520 },
    { symbol: 'RIL', name: 'Reliance', allocation: 0.20, price: 3285.75, basePrice: 2850 },
  ], []);

  // Calculate stock holdings based on investment amount
  const portfolio = useMemo(() => {
    return mockStocks.map(stock => {
      const investedAmount = wallet.invested * stock.allocation;
      const shares = investedAmount / stock.basePrice;
      const currentValue = shares * stock.price;
      const profit = currentValue - investedAmount;
      const profitPercent = ((stock.price - stock.basePrice) / stock.basePrice * 100).toFixed(2);

      return {
        ...stock,
        investedAmount: Math.round(investedAmount),
        shares: shares.toFixed(2),
        currentValue: Math.round(currentValue),
        profit: Math.round(profit),
        profitPercent,
      };
    });
  }, [wallet.invested, mockStocks]);

  const totalPortfolioValue = portfolio.reduce((sum, stock) => sum + stock.currentValue, 0);
  const totalProfit = portfolio.reduce((sum, stock) => sum + stock.profit, 0);
  const totalProfitPercent = wallet.invested > 0 ? ((totalProfit / wallet.invested) * 100).toFixed(2) : 0;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark-bg' : 'bg-gray-50'} p-4 md:p-8`}>
      <div className="max-w-5xl mx-auto">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
          📈 Virtual Stock Portfolio
        </h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
          Your diversified simulated investment portfolio. Learn how markets work!
        </p>

        {/* Portfolio Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Invested"
            value={formatCurrency(wallet.invested)}
            subtitle="from round-ups"
            icon="💰"
            darkMode={darkMode}
          />
          <StatCard
            title="Current Value"
            value={formatCurrency(totalPortfolioValue)}
            subtitle={`+${totalProfit > 0 ? totalProfitPercent : totalProfitPercent}%`}
            icon="📊"
            darkMode={darkMode}
          />
          <StatCard
            title="Unrealized Profit"
            value={formatCurrency(totalProfit)}
            subtitle={totalProfit > 0 ? 'Keep investing!' : 'Market varies'}
            icon="💹"
            darkMode={darkMode}
          />
        </div>

        {/* Growth Progress */}
        <Card darkMode={darkMode} className="mb-8">
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Portfolio Growth
          </h2>
          <ProgressBar
            progress={Math.min(totalPortfolioValue / (wallet.invested || 1) * 100, 150)}
            label={`${formatCurrency(wallet.invested)} → ${formatCurrency(totalPortfolioValue)}`}
            darkMode={darkMode}
          />
          <div className={`mt-4 p-3 rounded ${darkMode ? 'bg-dark-input' : 'bg-blue-50'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              💡 <span className="font-bold">Pro Tip:</span> Your investments are growing through compounding! Early saving habits like this can turn into life-changing wealth.
            </p>
          </div>
        </Card>

        {/* Individual Stock Holdings */}
        <Card darkMode={darkMode} className="mb-8">
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
            Your Holdings
          </h2>

          <div className="space-y-4">
            {portfolio.map((stock) => (
              <div key={stock.symbol} className={`p-4 rounded border ${darkMode ? 'border-gray-700 bg-dark-input' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {stock.symbol}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {stock.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${stock.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stock.profit >= 0 ? '+' : ''}{formatCurrency(stock.profit)}
                    </p>
                    <p className={`text-sm ${stock.profitPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stock.profitPercent >= 0 ? '+' : ''}{stock.profitPercent}%
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Shares</p>
                    <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stock.shares}</p>
                  </div>
                  <div>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Price</p>
                    <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{stock.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Invested</p>
                    <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(stock.investedAmount)}</p>
                  </div>
                  <div>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Current Value</p>
                    <p className={`font-bold text-primary`}>{formatCurrency(stock.currentValue)}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min((stock.profitPercent / 50) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Portfolio Allocation */}
        <Card darkMode={darkMode}>
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Allocation Strategy
          </h2>
          <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Your portfolio is diversified across 5 major Indian stocks for balanced growth.
          </p>

          <div className="space-y-3">
            {portfolio.map((stock) => (
              <div key={stock.symbol} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {stock.symbol} - {stock.name}
                    </span>
                    <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {(stock.allocation * 100)}%
                    </span>
                  </div>
                  <div className={`w-full h-2 bg-gray-300 rounded-full overflow-hidden`}>
                    <div
                      className="bg-primary h-full"
                      style={{ width: `${stock.allocation * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
