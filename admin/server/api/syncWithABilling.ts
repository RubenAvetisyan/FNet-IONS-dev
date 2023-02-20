import { readBody, H3Event } from 'h3';

type PaymentSystemName = 'Easypay' | 'Tellcell' | 'Idram' | 'FnetPay';

const paymentSystemUrls: Record<PaymentSystemName, string> = {
  Easypay: 'http://localhost:3000/payment',
  Tellcell: 'http://localhost:3000/telcell/?action=payment',
  Idram: 'http://localhost:3000/idram/?action=payment',
  FnetPay: 'http://localhost:3000/fnet-pay/?action=payment',
};

interface Data {data: {PaymentSystemName: PaymentSystemName; Checksum?: string}}
const handler = async (event: H3Event): Promise<any> => {
  const { data }: Data = await readBody(event)
  console.log('data: ', data);

  try {
    if (!data.Checksum) {
      console.warn('WRONG DATA !!!');
      return false;
    }

    let url = paymentSystemUrls[data.PaymentSystemName];

    if (!url) {
      console.error(`Class for "${data.PaymentSystemName}" is unrealized`);
      return 'not Done';
    }

    const response = await $fetch(url, {
      method: 'POST',
      body: data,
    });

    return response;
  } catch (error) {
    console.error('error: ', error);
  }
};

export default defineEventHandler(handler);
