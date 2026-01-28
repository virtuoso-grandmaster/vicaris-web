import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface PaymentFormProps {
  product: {
    id: string;
    name: string;
    price_range: string;
    slug: string;
  };
  onSuccess: () => void;
  onCancel: () => void;
}

interface PaymentFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  note: string;
  paymentMethod: 'stripe' | 'momo' | 'zalopay';
}

export function PaymentForm({ product, onSuccess, onCancel }: PaymentFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormData>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<'stripe' | 'momo' | 'zalopay'>('stripe');
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const { user } = useAuth();

  const onSubmit = async (data: PaymentFormData) => {
    if (!stripe || !elements) {
      toast({
        title: "Lỗi",
        description: "Stripe chưa được khởi tạo. Vui lòng thử lại.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 100000, // 1,000,000 VND in VND
          currency: 'vnd',
          product_id: product.id,
          customer_info: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            note: data.note
          }
        }),
      });

      const { clientSecret } = await response.json();

      // Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: data.name,
            email: data.email,
            address: {
              line1: data.address,
            },
          },
        },
      });

      if (result.error) {
        toast({
          title: "Thanh toán thất bại",
          description: result.error.message || "Có lỗi xảy ra trong quá trình thanh toán",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Thanh toán thành công",
          description: "Cảm ơn bạn đã ủng hộ Vicaris Shopee!"
        });
        onSuccess();
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Lỗi hệ thống",
        description: "Có lỗi xảy ra. Vui lòng thử lại sau.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMomoPayment = async () => {
    try {
      const response = await fetch('/api/create-momo-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 100000,
          product_id: product.id,
          customer_info: {
            name: user?.user_metadata?.full_name || '',
            email: user?.email || '',
            phone: '',
            address: '',
            note: ''
          }
        }),
      });

      const { paymentUrl } = await response.json();
      window.open(paymentUrl, '_blank');
    } catch (error) {
      console.error('Momo payment error:', error);
      toast({
        title: "Lỗi hệ thống",
        description: "Có lỗi xảy ra. Vui lòng thử lại sau.",
        variant: "destructive"
      });
    }
  };

  const handleZaloPayPayment = async () => {
    try {
      const response = await fetch('/api/create-zalopay-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 100000,
          product_id: product.id,
          customer_info: {
            name: user?.user_metadata?.full_name || '',
            email: user?.email || '',
            phone: '',
            address: '',
            note: ''
          }
        }),
      });

      const { paymentUrl } = await response.json();
      window.open(paymentUrl, '_blank');
    } catch (error) {
      console.error('ZaloPay payment error:', error);
      toast({
        title: "Lỗi hệ thống",
        description: "Có lỗi xảy ra. Vui lòng thử lại sau.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-ink mb-6">Thanh toán cho {product.name}</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Customer Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Họ tên *
            </label>
            <input
              {...register('name', { required: 'Vui lòng nhập họ tên' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-leaf"
              placeholder="Nhập họ tên"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              {...register('email', { 
                required: 'Vui lòng nhập email',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email không hợp lệ'
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-leaf"
              placeholder="Nhập email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại
            </label>
            <input
              {...register('phone')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-leaf"
              placeholder="Nhập số điện thoại"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Địa chỉ
            </label>
            <input
              {...register('address')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-leaf"
              placeholder="Nhập địa chỉ"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ghi chú
          </label>
          <textarea
            {...register('note')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-leaf"
            placeholder="Ghi chú thêm (nếu có)"
          />
        </div>

        {/* Payment Method Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Phương thức thanh toán
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setSelectedPayment('stripe')}
              className={`p-4 border rounded-lg text-center ${
                selectedPayment === 'stripe' 
                  ? 'border-leaf bg-leaf/10' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="font-medium">Thẻ tín dụng/ghi nợ</div>
              <div className="text-sm text-gray-600 mt-1">Visa, MasterCard, JCB</div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedPayment('momo')}
              className={`p-4 border rounded-lg text-center ${
                selectedPayment === 'momo' 
                  ? 'border-leaf bg-leaf/10' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="font-medium">MoMo</div>
              <div className="text-sm text-gray-600 mt-1">Ví điện tử MoMo</div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedPayment('zalopay')}
              className={`p-4 border rounded-lg text-center ${
                selectedPayment === 'zalopay' 
                  ? 'border-leaf bg-leaf/10' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="font-medium">ZaloPay</div>
              <div className="text-sm text-gray-600 mt-1">Ví điện tử ZaloPay</div>
            </button>
          </div>
        </div>

        {/* Payment Details */}
        {selectedPayment === 'stripe' && (
          <div className="border border-gray-300 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thông tin thẻ
            </label>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                },
              }}
            />
          </div>
        )}

        {/* Amount */}
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <span className="text-lg font-semibold">Tổng cộng:</span>
          <span className="text-2xl font-bold text-leaf">{product.price_range}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Hủy
          </Button>
          
          {selectedPayment === 'stripe' ? (
            <Button
              type="submit"
              disabled={!stripe || isProcessing}
              className="flex-1 bg-leaf hover:bg-leaf-dark text-white"
            >
              {isProcessing ? 'Đang xử lý...' : 'Thanh toán ngay'}
            </Button>
          ) : selectedPayment === 'momo' ? (
            <Button
              type="button"
              onClick={handleMomoPayment}
              className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
            >
              Thanh toán bằng MoMo
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleZaloPayPayment}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Thanh toán bằng ZaloPay
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}