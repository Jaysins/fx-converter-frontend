import api from './api';
import { ApiResponse, PaginatedResponse } from '../types/api.types';
import { Transaction, TransactionFilters } from '../types/transaction.types';

/**
 * Transaction service - handles transaction/conversion history API calls
 */
class TransactionService {
  /**
   * Get paginated list of user's transactions
   */
  async getTransactions(
    page: number = 1,
    limit: number = 10,
    filters?: Partial<TransactionFilters>
  ): Promise<PaginatedResponse<Transaction>> {
    const params: any = {
      page,
      limit,
      ...filters,
    };

    const response = await api.get<PaginatedResponse<Transaction>>(
      '/conversions',
      { params }
    );
    
    return response.data;
  }

  /**
   * Get single transaction by ID
   */
  async getTransactionById(id: string): Promise<Transaction> {
    const response = await api.get<ApiResponse<Transaction>>(
      `/conversions/${id}`
    );
    return response.data.data;
  }

  /**
   * Get recent transactions (no pagination)
   */
  async getRecentTransactions(limit: number = 20): Promise<Transaction[]> {
    const response = await api.get<ApiResponse<Transaction[]>>(
      '/dashboard/recent',
      { params: { limit } }
    );
    return response.data.data;
  }

  /**
   * Get dashboard statistics
   */
  async getStats(days: number = 30): Promise<any> {
    const response = await api.get<ApiResponse<any>>(
      '/dashboard/stats',
      { params: { days } }
    );
    return response.data.data;
  }

  /**
   * Get chart data for visualizations
   */
  async getChartData(days: number = 7): Promise<any> {
    const response = await api.get<ApiResponse<any>>(
      '/dashboard/chart',
      { params: { days } }
    );
    return response.data.data;
  }
}

// Export singleton instance
export const transactionService = new TransactionService();