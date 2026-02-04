import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BookingCalendar = ({ onSelect, onBack }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const isDateAvailable = (date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateSelect = (date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date);
      setSelectedTime('');
    }
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      onSelect(selectedDate, selectedTime);
    }
  };

  const days = getDaysInMonth(currentDate);
  const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-card rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Select Date & Time</h2>
      
      <div className="bg-gray-800/50 rounded-lg p-6 mb-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="text-lg font-semibold text-primary">{monthYear}</span>
          <Button variant="ghost" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((date, index) => (
            <motion.button
              key={index}
              whileHover={date && isDateAvailable(date) ? { scale: 1.05 } : {}}
              whileTap={date && isDateAvailable(date) ? { scale: 0.95 } : {}}
              onClick={() => handleDateSelect(date)}
              disabled={!date || !isDateAvailable(date)}
              className={`aspect-square rounded-lg text-sm font-medium transition-colors ${
                !date
                  ? 'invisible'
                  : !isDateAvailable(date)
                  ? 'text-muted-foreground/50 cursor-not-allowed'
                  : selectedDate?.getTime() === date?.getTime()
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-primary/20 text-foreground'
              }`}
            >
              {date?.getDate()}
            </motion.button>
          ))}
        </div>
      </div>

      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 rounded-lg p-6 mb-6 border border-border"
        >
          <h3 className="font-semibold mb-4 text-foreground">Available Time Slots for <span className="text-primary">{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span></h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? 'default' : 'outline'}
                onClick={() => setSelectedTime(time)}
                className="w-full"
              >
                {time}
              </Button>
            ))}
          </div>
        </motion.div>
      )}

      <div className="flex space-x-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime}
          className="flex-1"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default BookingCalendar;