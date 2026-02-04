import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Building2, Truck, Shield, Clock } from 'lucide-react';
import MobileRigSection from '@/components/MobileRigSection';

const FleetPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    fleetSize: '',
    vehicleTypes: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const inquiries = JSON.parse(localStorage.getItem('fleetInquiries') || '[]');
    inquiries.push({
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('fleetInquiries', JSON.stringify(inquiries));

    toast({
      title: "Inquiry Submitted!",
      description: "We'll contact you within 24 hours to discuss your fleet needs.",
    });

    setFormData({
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      fleetSize: '',
      vehicleTypes: '',
      message: ''
    });
  };

  const benefits = [
    {
      icon: Building2,
      title: 'Corporate Accounts',
      description: 'Dedicated account management and customized service plans'
    },
    {
      icon: Truck,
      title: 'Volume Discounts',
      description: 'Competitive pricing for multiple vehicles and regular service'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Consistent results across your entire fleet'
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'On-site service available to minimize downtime'
    }
  ];

  return (
    <div>
      <Helmet>
        <title>Fleet Services - Riotous Car Care</title>
        <meta name="description" content="Professional fleet detailing services for private companies and government entities. Volume discounts and flexible scheduling available." />
      </Helmet>

      <section className="bg-gradient-to-br from-gray-900 to-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold mb-4 text-primary">Fleet Services</h1>
            <p className="text-xl text-gray-300">
              Professional detailing solutions for businesses and government agencies
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-card rounded-lg"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-primary">Why Choose Our Fleet Services?</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">For Private Companies</h3>
                  <p className="text-gray-300">
                    Maintain a professional image with consistently clean and well-maintained vehicles. We offer flexible scheduling, volume discounts, and dedicated account management to keep your fleet looking its best.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">For Government Entities</h3>
                  <p className="text-gray-300">
                    We understand the unique requirements of government contracts. Our services comply with all necessary regulations, and we provide detailed documentation and reporting for your records.
                  </p>
                </div>
                <div className="bg-primary/10 border border-primary/50 rounded-lg p-6">
                  <h3 className="font-semibold mb-2 text-foreground">Services We Offer</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-gray-300">Regular maintenance detailing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-gray-300">Deep cleaning and sanitization</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-gray-300">Paint protection and ceramic coating</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-gray-300">On-site mobile detailing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-gray-300">Emergency cleaning services</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-foreground">Request a Fleet Quote</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="companyName" className="text-gray-300">Company Name *</Label>
                  <Input
                    id="companyName"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-foreground placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <Label htmlFor="contactName" className="text-gray-300">Contact Name *</Label>
                  <Input
                    id="contactName"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-foreground placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-foreground placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-300">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-foreground placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <Label htmlFor="fleetSize" className="text-gray-300">Fleet Size *</Label>
                  <Input
                    id="fleetSize"
                    required
                    placeholder="e.g., 10 vehicles"
                    value={formData.fleetSize}
                    onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-foreground placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <Label htmlFor="vehicleTypes" className="text-gray-300">Vehicle Types *</Label>
                  <Input
                    id="vehicleTypes"
                    required
                    placeholder="e.g., Sedans, SUVs, Trucks"
                    value={formData.vehicleTypes}
                    onChange={(e) => setFormData({ ...formData, vehicleTypes: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-foreground placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-gray-300">Additional Details</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your specific needs..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-foreground placeholder:text-gray-500"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit Inquiry
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <MobileRigSection />
    </div>
  );
};

export default FleetPage;