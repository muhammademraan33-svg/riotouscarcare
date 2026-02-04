import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import BookingForm from '@/components/BookingForm';
import BookingCalendar from '@/components/BookingCalendar';

const BookingPage = () => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    vehicleType: '',
    year: '',
    make: '',
    model: '',
    service: '',
    date: null,
    timeSlot: '',
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      vehicleDetails: ''
    }
  });

  const { toast } = useToast();

  const handleFormSubmit = (formData) => {
    setBookingData({ ...bookingData, ...formData });
    setStep(2);
  };

  const handleDateTimeSelect = (date, timeSlot) => {
    setBookingData({ ...bookingData, date, timeSlot });
    setStep(3);
  };

  const handlePaymentSubmit = () => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const newBooking = {
      id: Date.now(),
      ...bookingData,
      status: 'pending confirmation',
      depositPaid: false,
      createdAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    toast({
      title: "Booking Request Sent!",
      description: "We've received your request and will contact you shortly to confirm your appointment. Automatic notifications are not yet enabled.",
      duration: 7000
    });
    
    // This is a placeholder for sending email/text notifications
    if (bookingData.customerInfo.contactPreference.email) {
      console.log("Placeholder: Send booking request confirmation EMAIL");
    }
    if (bookingData.customerInfo.contactPreference.text) {
      console.log("Placeholder: Send booking request confirmation TEXT");
    }
    if (bookingData.customerInfo.contactPreference.call) {
      console.log("Placeholder: Schedule a CALL to confirm booking");
    }
  };

  const formatMakeName = (make) => {
    if (!make) return '';
    return make.replace(/SUV$|Truck$|Van$/, '');
  }

  return (
    <div>
      <Helmet>
        <title>Book Your Service - Riotous Car Care</title>
        <meta name="description" content="Schedule your auto detailing appointment online. Easy booking with secure 25% deposit payment." />
      </Helmet>
      
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
             <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-5xl font-bold mb-4 text-primary">Book Your Service</h1>
                <p className="text-xl text-gray-300">
                  Schedule your appointment in just a few simple steps
                </p>
              </motion.div>
           </div>
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((stepNum) => (
                <React.Fragment key={stepNum}>
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold ${
                    step >= stepNum ? 'bg-primary text-gray-900' : 'bg-gray-700 text-gray-400'
                  }`}>
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={`h-1 w-16 ${
                      step > stepNum ? 'bg-primary' : 'bg-gray-700'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-sm font-medium">
              <span className={step >= 1 ? 'text-primary' : 'text-gray-400'}>Service Details</span>
              <span className={step >= 2 ? 'text-primary' : 'text-gray-400'}>Select Date & Time</span>
              <span className={step >= 3 ? 'text-primary' : 'text-gray-400'}>Confirmation</span>
            </div>
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {step === 1 && <BookingForm onSubmit={handleFormSubmit} />}
            {step === 2 && (
              <BookingCalendar
                onSelect={handleDateTimeSelect}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <div className="bg-card rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-foreground">Confirm Your Request</h2>
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold mb-4 text-foreground">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Vehicle:</span>
                      <span className="font-medium text-foreground">{bookingData.year} {formatMakeName(bookingData.make)} {bookingData.model} ({bookingData.vehicleType})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Service:</span>
                      <span className="font-medium text-foreground">{bookingData.service}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Requested Date:</span>
                      <span className="font-medium text-foreground">{bookingData.date?.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Requested Time:</span>
                      <span className="font-medium text-foreground">{bookingData.timeSlot}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-primary/10 border border-primary/50 rounded-lg p-6 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-foreground">25% Deposit Required upon Confirmation</span>
                    <span className="text-2xl font-bold text-primary">$75.00</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    We will send you a payment link after confirming your appointment.
                  </p>
                </div>
                <div className="flex space-x-4">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-700">
                    Back
                  </Button>
                  <Button onClick={handlePaymentSubmit} className="flex-1 bg-primary text-gray-900 hover:bg-primary/90">
                    Submit Request
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;