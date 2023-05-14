import { readBody, H3Event } from 'h3';

type PaymentSystemName = 'Easypay' | 'Tellcell' | 'Idram' | 'FnetPay';

const paymentSystemUrls: Record<PaymentSystemName, string> = {
  Easypay: 'https://payment.fnet.am/payment',
  Tellcell: 'https://payment.fnet.am/telcell/?action=payment',
  Idram: 'https://payment.fnet.am/idram/?action=payment',
  FnetPay: 'https://payment.fnet.am/fnet-pay/?action=payment',
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
