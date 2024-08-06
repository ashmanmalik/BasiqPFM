import dynamic from 'next/dynamic';
import TransactionsDataContextProvider from '../store/context/transactionContext';
import { ToastNotification } from '@/components/ToastNotification';
import { AccountVerificationFormProvider } from '@/components/AccountVerificationForm';
import '../styles.css'; 

function MyApp({ Component, pageProps }) {
  return (
    <> 
        <AccountVerificationFormProvider>
          <TransactionsDataContextProvider>
          <Component {...pageProps} />
          </TransactionsDataContextProvider>
        </AccountVerificationFormProvider> 

      <ToastNotification />
    </>
  );
}
export default dynamic (() => Promise.resolve(MyApp), {ssr: false})