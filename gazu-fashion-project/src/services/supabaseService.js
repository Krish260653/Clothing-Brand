import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Creates a new order in Supabase with line items
 */
export async function createOrder({ orderNumber, items, totalAmount, customerEmail = 'guest@gazu.in', address = 'New Delhi' }) {
  try {
    if (!isSupabaseConfigured) {
      console.log('📦 Local order stored (Supabase pending connection):', { orderNumber, totalAmount, items });
      return { success: true, orderNumber };
    }

    // 1. Insert into orders table
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          order_number: orderNumber,
          total_amount: totalAmount,
          customer_email: customerEmail,
          shipping_address: address,
          status: 'confirmed'
        }
      ])
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. Insert line items
    const orderItems = items.map((item) => ({
      order_id: orderData.id,
      product_id: item.id,
      product_name: item.name,
      size: item.selectedSize || 'M',
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return { success: true, order: orderData };
  } catch (err) {
    console.error('Error saving order to Supabase:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Subscribes an email to the newsletter table
 */
export async function subscribeNewsletter(email) {
  try {
    if (!isSupabaseConfigured) {
      console.log('✉️ Newsletter subscription noted (Supabase pending connection):', email);
      return { success: true };
    }

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }])
      .select();

    if (error) {
      // Check for unique constraint (already subscribed)
      if (error.code === '23505') {
        return { success: true, message: 'Already subscribed' };
      }
      throw error;
    }

    return { success: true, data };
  } catch (err) {
    console.error('Error subscribing to newsletter:', err);
    return { success: false, error: err.message };
  }
}
