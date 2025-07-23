import React from 'react'
import Lottie from 'lottie-react';
import doctorLoading from '../assets/doctor.json';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
      <Lottie animationData={doctorLoading} loop style={{ height: 500, width: 500 }} />
    </div>
  );
};

export default Loader