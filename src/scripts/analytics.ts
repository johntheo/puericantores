import { getAnalytics, isSupported } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAIYHifZnAHmdcACEPjFvSaHiN4bSCTe8A',
  authDomain: 'site-fnpcb.firebaseapp.com',
  projectId: 'site-fnpcb',
  storageBucket: 'site-fnpcb.firebasestorage.app',
  messagingSenderId: '71383972784',
  appId: '1:71383972784:web:465619c79350c7699db475',
  measurementId: 'G-B37G1LG1C1',
};

if (import.meta.env.PUBLIC_PREVIEW !== 'true') {
  const app = initializeApp(firebaseConfig);

  // Analytics não é suportado em todos os navegadores (por exemplo, alguns
  // ambientes com bloqueio de armazenamento ou sem cookies).
  isSupported().then((supported) => {
    if (supported) getAnalytics(app);
  });
}
