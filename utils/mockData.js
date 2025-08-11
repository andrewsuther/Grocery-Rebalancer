function getProgressData(period, view = 'category', dateRange = {}, simulationMode = false, simulationParams = {}) {
    try {
      // Adjust data based on view type
      const viewMultiplier = view === 'division' ? 1.2 : 1;
      
      const baseData = {
        week: {
          costRecovery: { 
            current: Math.round(15000 * viewMultiplier), 
            target: Math.round(20000 * viewMultiplier), 
            percentage: 75, 
            status: 'on-track' 
          },
          cpiOffsetting: { 
            current: Math.round(8500 * viewMultiplier), 
            target: Math.round(12000 * viewMultiplier), 
            percentage: 71, 
            status: 'behind' 
          },
          costOffset: { 
            percentage: 68, 
            marginRecovered: Math.round(12500 * viewMultiplier), 
            cpiTargetMet: 71 
          },
          offsetContributors: [
            { id: 1, actionType: 'TPR', actionTypeName: 'Temporary Price Reduction', actionsTaken: 45, forecastedImpact: 8500, actualImpact: 7800, contribution: 35.2 },
            { id: 2, actionType: 'Cover', actionTypeName: 'Cover Pricing', actionsTaken: 28, forecastedImpact: 6200, actualImpact: 6800, contribution: 30.7 },
            { id: 3, actionType: 'Fat5', actionTypeName: 'Fat 5 Items', actionsTaken: 15, forecastedImpact: 4100, actualImpact: 4300, contribution: 19.4 },
            { id: 4, actionType: 'Everyday', actionTypeName: 'Everyday Low Price', actionsTaken: 32, forecastedImpact: 3200, actualImpact: 3250, contribution: 14.7 }
          ],
          metrics: {
            totalSavings: Math.round(23500 * viewMultiplier),
            savingsChange: 12,
            priceAdjustments: Math.round(145 * viewMultiplier),
            adjustmentsChange: 8,
            efficiencyScore: 87,
            efficiencyChange: 5,
            itemsRebalanced: Math.round(1250 * viewMultiplier),
            itemsChange: 15
          },
          aiInsights: {
            topContributor: 'Temporary Price Reduction on Dairy Products',
            underperformingPromo: 'Fat 5 Items in Frozen Foods',
            projectedGoalDate: 'February 28, 2025',
            suggestedAction: 'Consider increasing TPR depth on Premium Coffee brands for improved performance'
          }
        },
        month: {
          costRecovery: { 
            current: Math.round(65000 * viewMultiplier), 
            target: Math.round(80000 * viewMultiplier), 
            percentage: 81, 
            status: 'on-track' 
          },
          cpiOffsetting: { 
            current: Math.round(42000 * viewMultiplier), 
            target: Math.round(50000 * viewMultiplier), 
            percentage: 84, 
            status: 'on-track' 
          },
          costOffset: { 
            percentage: 82, 
            marginRecovered: Math.round(58500 * viewMultiplier), 
            cpiTargetMet: 84 
          },
          offsetContributors: [
            { id: 1, actionType: 'TPR', actionTypeName: 'Temporary Price Reduction', actionsTaken: 185, forecastedImpact: 35000, actualImpact: 32500, contribution: 33.8 },
            { id: 2, actionType: 'Cover', actionTypeName: 'Cover Pricing', actionsTaken: 125, forecastedImpact: 28000, actualImpact: 30200, contribution: 31.4 },
            { id: 3, actionType: 'Fat5', actionTypeName: 'Fat 5 Items', actionsTaken: 68, forecastedImpact: 18500, actualImpact: 19800, contribution: 20.6 },
            { id: 4, actionType: 'Everyday', actionTypeName: 'Everyday Low Price', actionsTaken: 142, forecastedImpact: 14200, actualImpact: 13800, contribution: 14.3 }
          ],
          metrics: {
            totalSavings: Math.round(107000 * viewMultiplier),
            savingsChange: 18,
            priceAdjustments: Math.round(580 * viewMultiplier),
            adjustmentsChange: 12,
            efficiencyScore: 92,
            efficiencyChange: 8,
            itemsRebalanced: Math.round(4850 * viewMultiplier),
            itemsChange: 22
          },
          aiInsights: {
            topContributor: 'Cover Pricing on Fresh Produce',
            underperformingPromo: 'Everyday Low Price on Electronics',
            projectedGoalDate: 'March 15, 2025',
            suggestedAction: 'Optimize TPR frequency on Organic Products to capture seasonal demand'
          }
        },
        quarter: {
          costRecovery: { 
            current: Math.round(185000 * viewMultiplier), 
            target: Math.round(240000 * viewMultiplier), 
            percentage: 77, 
            status: 'behind' 
          },
          cpiOffsetting: { 
            current: Math.round(125000 * viewMultiplier), 
            target: Math.round(150000 * viewMultiplier), 
            percentage: 83, 
            status: 'on-track' 
          },
          costOffset: { 
            percentage: 76, 
            marginRecovered: Math.round(175000 * viewMultiplier), 
            cpiTargetMet: 83 
          },
          offsetContributors: [
            { id: 1, actionType: 'TPR', actionTypeName: 'Temporary Price Reduction', actionsTaken: 520, forecastedImpact: 95000, actualImpact: 88500, contribution: 32.1 },
            { id: 2, actionType: 'Cover', actionTypeName: 'Cover Pricing', actionsTaken: 385, forecastedImpact: 82000, actualImpact: 86200, contribution: 31.3 },
            { id: 3, actionType: 'Fat5', actionTypeName: 'Fat 5 Items', actionsTaken: 198, forecastedImpact: 52000, actualImpact: 55800, contribution: 20.2 },
            { id: 4, actionType: 'Everyday', actionTypeName: 'Everyday Low Price', actionsTaken: 425, forecastedImpact: 42000, actualImpact: 44800, contribution: 16.2 }
          ],
          metrics: {
            totalSavings: Math.round(310000 * viewMultiplier),
            savingsChange: 15,
            priceAdjustments: Math.round(1750 * viewMultiplier),
            adjustmentsChange: 10,
            efficiencyScore: 89,
            efficiencyChange: 3,
            itemsRebalanced: Math.round(14500 * viewMultiplier),
            itemsChange: 18
          },
          aiInsights: {
            topContributor: 'Strategic TPR Campaign on Household Essentials',
            underperformingPromo: 'Fat 5 Items in Health & Beauty',
            projectedGoalDate: 'June 30, 2025',
            suggestedAction: 'Expand Cover Pricing strategy to high-velocity SKUs for maximum impact'
          }
        }
      };
  
      const selectedData = baseData[period] || baseData.month;
      
      // Apply quarter-specific adjustments if needed
      if (period === 'quarter' && dateRange.quarter) {
        const quarterMultipliers = {
          q1: 0.8, q2: 1.0, q3: 1.1, q4: 1.3
        };
        const qMultiplier = quarterMultipliers[dateRange.quarter] || 1;
        
        // Apply quarter multiplier to key metrics
        selectedData.costRecovery.current = Math.round(selectedData.costRecovery.current * qMultiplier);
        selectedData.cpiOffsetting.current = Math.round(selectedData.cpiOffsetting.current * qMultiplier);
        selectedData.costOffset.marginRecovered = Math.round(selectedData.costOffset.marginRecovered * qMultiplier);
      }
      
      // Apply simulation adjustments if in simulation mode
      if (simulationMode && simulationParams) {
        const simulationImpact = calculateSimulationImpact(simulationParams, selectedData);
        
        selectedData.costRecovery.current += simulationImpact.costRecoveryBoost;
        selectedData.cpiOffsetting.current += simulationImpact.cpiBoost;
        selectedData.costOffset.marginRecovered += simulationImpact.marginBoost;
        selectedData.costOffset.percentage = Math.min(100, selectedData.costOffset.percentage + simulationImpact.percentageBoost);
        
        // Recalculate percentages
        selectedData.costRecovery.percentage = Math.round((selectedData.costRecovery.current / selectedData.costRecovery.target) * 100);
        selectedData.cpiOffsetting.percentage = Math.round((selectedData.cpiOffsetting.current / selectedData.cpiOffsetting.target) * 100);
        
        // Add simulation insights
        selectedData.simulationForecast = simulationImpact.forecast;
      }
      
      return selectedData;
    } catch (error) {
      console.error('getProgressData error:', error);
      return null;
    }
  }
  
  function generateAlerts(data, selectedPeriod, selectedDesk) {
    try {
      const alerts = [];
      const now = new Date();
      
      // Performance threshold alerts
      const avgProgress = (data.costRecovery.percentage + data.cpiOffsetting.percentage) / 2;
      
      if (avgProgress < 60) {
        alerts.push({
          id: 1,
          type: 'critical',
          title: 'Critical Performance Alert',
          description: `${selectedDesk} desk performance at ${avgProgress.toFixed(1)}% - immediate action required`,
          timestamp: new Date(now - 5 * 60000), // 5 minutes ago
          read: false,
          metric: { current: `${avgProgress.toFixed(1)}%`, target: '85%' },
          actions: [
            { label: 'View Details', handler: () => alert('Opening performance details...') },
            { label: 'Launch TPR', handler: () => alert('Launching TPR campaign...') }
          ]
        });
      } else if (avgProgress < 75) {
        alerts.push({
          id: 2,
          type: 'warning',
          title: 'Performance Below Target',
          description: `${selectedDesk} desk at ${avgProgress.toFixed(1)}% - consider optimization`,
          timestamp: new Date(now - 15 * 60000), // 15 minutes ago
          read: false,
          metric: { current: `${avgProgress.toFixed(1)}%`, target: '85%' },
          actions: [
            { label: 'Optimize', handler: () => alert('Opening optimization panel...') }
          ]
        });
      }
  
      // Efficiency alerts
      if (data.metrics.efficiencyScore < 80) {
        alerts.push({
          id: 3,
          type: 'warning',
          title: 'Low Efficiency Detected',
          description: `Pricing efficiency at ${data.metrics.efficiencyScore}% - review action targeting`,
          timestamp: new Date(now - 30 * 60000), // 30 minutes ago
          read: false,
          actions: [
            { label: 'Review Actions', handler: () => alert('Opening action review...') }
          ]
        });
      }
  
      // Opportunity alerts
      if (data.costRecovery.percentage > 90) {
        alerts.push({
          id: 4,
          type: 'opportunity',
          title: 'Expansion Opportunity',
          description: 'Excellent performance - consider expanding strategy to similar categories',
          timestamp: new Date(now - 45 * 60000), // 45 minutes ago
          read: false,
          actions: [
            { label: 'Expand Strategy', handler: () => alert('Opening expansion options...') }
          ]
        });
      }
  
      // Trend alerts
      if (selectedPeriod === 'week' && Math.random() > 0.5) {
        alerts.push({
          id: 5,
          type: 'info',
          title: 'Weekly Trend Update',
          description: 'Performance trending upward - maintain current strategy',
          timestamp: new Date(now - 60 * 60000), // 1 hour ago
          read: true
        });
      }
  
      return alerts;
    } catch (error) {
      console.error('generateAlerts error:', error);
      return [];
    }
  }
  
  function applyFilters(data, filters) {
    try {
      if (!data || !filters) return data;
  
      let filteredData = { ...data };
  
      // Apply search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredData.offsetContributors = filteredData.offsetContributors.filter(contributor =>
          contributor.actionTypeName.toLowerCase().includes(searchTerm) ||
          contributor.actionType.toLowerCase().includes(searchTerm)
        );
      }
  
      // Apply action type filter
      if (filters.actionTypes && filters.actionTypes.length > 0) {
        filteredData.offsetContributors = filteredData.offsetContributors.filter(contributor =>
          filters.actionTypes.includes(contributor.actionType)
        );
      }
  
      // Apply sorting
      if (filters.sortBy && filteredData.offsetContributors) {
        filteredData.offsetContributors.sort((a, b) => {
          let aVal, bVal;
          
          switch (filters.sortBy) {
            case 'performance':
              aVal = a.contribution;
              bVal = b.contribution;
              break;
            case 'impact':
              aVal = a.actualImpact;
              bVal = b.actualImpact;
              break;
            case 'efficiency':
              aVal = a.actualImpact / a.forecastedImpact;
              bVal = b.actualImpact / b.forecastedImpact;
              break;
            default:
              aVal = a.actionsTaken;
              bVal = b.actionsTaken;
          }
          
          const multiplier = filters.sortOrder === 'asc' ? 1 : -1;
          return (aVal - bVal) * multiplier;
        });
      }
  
      return filteredData;
    } catch (error) {
      console.error('applyFilters error:', error);
      return data;
    }
  }
  
  function calculateSimulationImpact(params, baseData) {
    try {
      const { promoType, priceReduction, duration, targetCategories } = params;
      
      // Calculate impact multipliers based on simulation parameters
      const typeMultipliers = {
        'TPR': 1.2,
        'Cover': 1.0,
        'Fat5': 0.8,
        'Everyday': 0.9
      };
      
      const baseImpact = (priceReduction / 100) * duration * (typeMultipliers[promoType] || 1) * targetCategories.length;
      
      return {
        costRecoveryBoost: Math.round(baseImpact * 5000),
        cpiBoost: Math.round(baseImpact * 3000),
        marginBoost: Math.round(baseImpact * 4000),
        percentageBoost: Math.round(baseImpact * 8),
        forecast: {
          projectedOffset: Math.min(100, baseData.costOffset.percentage + Math.round(baseImpact * 8)),
          estimatedROI: Math.round(baseImpact * 150),
          riskLevel: priceReduction > 20 ? 'high' : priceReduction > 10 ? 'medium' : 'low'
        }
      };
    } catch (error) {
      console.error('calculateSimulationImpact error:', error);
      return null;
    }
  }
  