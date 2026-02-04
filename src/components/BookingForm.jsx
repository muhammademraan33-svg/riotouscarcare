import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Info } from 'lucide-react';

const BookingForm = ({ onSubmit }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    vehicleType: '',
    year: '',
    make: '',
    model: '',
    service: '',
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      vehicleDetails: '',
      contactPreference: {
        email: false,
        text: false,
        call: false,
      }
    },
    licensePlate: '',
    licenseState: ''
  });

  const vehicleTypes = ['Bike', 'Car', 'Commercial Van', 'Pickup Truck', 'RV', 'Semi Truck', 'SUV'].sort();

  const parsePrice = (serviceString) => {
    const priceMatch = serviceString.match(/\$(\d+(,\d{3})*(\.\d{2})?)/);
    return priceMatch ? parseFloat(priceMatch[1].replace(/,/g, '')) : 0;
  };
  
  const sortServicesByPrice = (serviceList) => {
    return serviceList.sort((a, b) => parsePrice(a) - parsePrice(b));
  };

  const services = {
    Car: sortServicesByPrice(['Basic Detail - $149', 'Premium Detail - $299', 'Paint Correction - $599', 'Ceramic Coating - $1,299']),
    SUV: sortServicesByPrice(['Basic SUV Detail - $199', 'Premium SUV Detail - $349', 'Paint Correction - $699', 'Ceramic Coating - $1,499']),
    'Pickup Truck': sortServicesByPrice(['Basic Truck Detail - $229', 'Premium Truck Detail - $399', 'Paint Correction - $799', 'Ceramic Coating - $1,699']),
    Bike: sortServicesByPrice(['Basic Bike Detail - $99', 'Premium Bike Detail - $249', 'Full Ceramic & Polish - $499']),
    RV: sortServicesByPrice(['Exterior Wash & Wax - $299', 'RV Exterior Detail - $399', 'Full RV Detail - $799']),
    'Commercial Van': sortServicesByPrice(['Exterior Wash - $129', 'Interior Cabin Detail - $199', 'Full Detail - $499']),
    'Semi Truck': sortServicesByPrice(['Cabin Detail - $299', 'Exterior Wash & Wax - $599', 'Full Rig Detail - $999'])
  };

  const makesAndModels = {
    // Cars
    Acura: ['Integra', 'TLX'].sort(),
    Audi: ['A4', 'A6', 'A8', 'R8'].sort(),
    BMW: ['3 Series', '5 Series', '7 Series', 'M4'].sort(),
    Chevrolet: ['Camaro', 'Corvette', 'Malibu'].sort(),
    Dodge: ['Challenger', 'Charger'].sort(),
    Ford: ['Mustang'].sort(),
    Honda: ['Accord', 'Civic'].sort(),
    Hyundai: ['Elantra', 'Sonata'].sort(),
    Kia: ['Forte', 'Stinger'].sort(),
    Lexus: ['ES', 'IS', 'LS'].sort(),
    Mazda: ['Mazda3', 'Mazda6', 'MX-5 Miata'].sort(),
    MercedesBenz: ['C-Class', 'E-Class', 'S-Class'].sort(),
    Nissan: ['Altima', 'Maxima', 'Z'].sort(),
    Subaru: ['Impreza', 'Legacy', 'WRX'].sort(),
    Tesla: ['Model 3', 'Model S'].sort(),
    Toyota: ['Camry', 'Corolla', 'Supra'].sort(),
    Volkswagen: ['Arteon', 'Golf', 'Jetta', 'Passat'].sort(),

    // SUVs
    AcuraSUV: ['MDX', 'RDX'].sort(),
    AudiSUV: ['Q3', 'Q5', 'Q7', 'Q8'].sort(),
    BMWSUV: ['X1', 'X3', 'X5', 'X7'].sort(),
    ChevroletSUV: ['Equinox', 'Suburban', 'Tahoe', 'Traverse'].sort(),
    DodgeSUV: ['Durango', 'Hornet'].sort(),
    FordSUV: ['Bronco', 'Escape', 'Expedition', 'Explorer'].sort(),
    HondaSUV: ['CR-V', 'HR-V', 'Passport', 'Pilot'].sort(),
    HyundaiSUV: ['Kona', 'Palisade', 'Tucson', 'Venue'].sort(),
    Jeep: ['Compass', 'Grand Cherokee', 'Renegade', 'Wrangler'].sort(),
    KiaSUV: ['Seltos', 'Sorento', 'Sportage', 'Telluride'].sort(),
    LexusSUV: ['GX', 'LX', 'NX', 'RX'].sort(),
    MazdaSUV: ['CX-30', 'CX-5', 'CX-50', 'CX-90'].sort(),
    MercedesBenzSUV: ['GLA', 'GLB', 'GLC', 'GLE', 'GLS'].sort(),
    NissanSUV: ['Armada', 'Kicks', 'Murano', 'Pathfinder', 'Rogue'].sort(),
    SubaruSUV: ['Ascent', 'Crosstrek', 'Forester', 'Outback'].sort(),
    TeslaSUV: ['Model X', 'Model Y'].sort(),
    ToyotaSUV: ['4Runner', 'Highlander', 'RAV4', 'Sequoia'].sort(),
    VolkswagenSUV: ['Atlas', 'Taos', 'Tiguan'].sort(),

    // Pickup Trucks
    ChevroletTruck: ['Colorado', 'Silverado 1500', 'Silverado HD'].sort(),
    FordTruck: ['F-150', 'Ranger', 'Super Duty'].sort(),
    GMC: ['Canyon', 'Sierra 1500', 'Sierra HD'].sort(),
    HondaTruck: ['Ridgeline'].sort(),
    HyundaiTruck: ['Santa Cruz'].sort(),
    NissanTruck: ['Frontier', 'Titan'].sort(),
    Ram: ['1500', '2500/3500'].sort(),
    ToyotaTruck: ['Tacoma', 'Tundra'].sort(),

    // Bikes
    Ducati: ['Monster', 'Multistrada', 'Panigale'].sort(),
    HarleyDavidson: ['CVO', 'Softail', 'Sportster', 'Touring'].sort(),
    Indian: ['Chief', 'Chieftain', 'FTR', 'Scout'].sort(),
    Kawasaki: ['Ninja', 'Vulcan', 'Z-Series'].sort(),
    Yamaha: ['MT-Series', 'R-Series', 'Star Venture'].sort(),

    // RVs
    Airstream: ['Basecamp', 'Classic', 'Globetrotter', 'Interstate'].sort(),
    ForestRiver: ['Cherokee', 'Flagstaff', 'Sunseeker'].sort(),
    Jayco: ['Eagle', 'Jay Flight', 'Redhawk'].sort(),
    Thor: ['A.C.E.', 'Chateau', 'Vegas'].sort(),
    Winnebago: ['Revel', 'Solis', 'Travato', 'View'].sort(),

    // Commercial Vans
    FordVan: ['E-Transit', 'Transit'].sort(),
    MercedesBenzVan: ['Metris', 'Sprinter'].sort(),
    RamVan: ['ProMaster'].sort(),

    // Semi Trucks
    Freightliner: ['Cascadia', 'M2 106'].sort(),
    Kenworth: ['T680', 'W990'].sort(),
    Peterbilt: ['Model 389', 'Model 579'].sort(),
    VolvoTrucks: ['VNL', 'VNR'].sort()
  };

  const makesByVehicleType = {
    Car: ['Acura', 'Audi', 'BMW', 'Chevrolet', 'Dodge', 'Ford', 'Honda', 'Hyundai', 'Kia', 'Lexus', 'Mazda', 'MercedesBenz', 'Nissan', 'Subaru', 'Tesla', 'Toyota', 'Volkswagen'].sort(),
    SUV: ['AcuraSUV', 'AudiSUV', 'BMWSUV', 'ChevroletSUV', 'DodgeSUV', 'FordSUV', 'HondaSUV', 'HyundaiSUV', 'Jeep', 'KiaSUV', 'LexusSUV', 'MazdaSUV', 'MercedesBenzSUV', 'NissanSUV', 'SubaruSUV', 'TeslaSUV', 'ToyotaSUV', 'VolkswagenSUV'].sort(),
    'Pickup Truck': ['ChevroletTruck', 'FordTruck', 'GMC', 'HondaTruck', 'HyundaiTruck', 'NissanTruck', 'Ram', 'ToyotaTruck'].sort(),
    Bike: ['Ducati', 'HarleyDavidson', 'Indian', 'Kawasaki', 'Yamaha'].sort(),
    RV: ['Airstream', 'ForestRiver', 'Jayco', 'Thor', 'Winnebago'].sort(),
    'Commercial Van': ['FordVan', 'MercedesBenzVan', 'RamVan'].sort(),
    'Semi Truck': ['Freightliner', 'Kenworth', 'Peterbilt', 'VolvoTrucks'].sort()
  };

  const getMakesForVehicleType = (type) => {
    return makesByVehicleType[type] || [];
  };
  
  const getModels = (make) => {
      return makesAndModels[make] || [];
  }

  const getYears = () => {
    const years = [];
    for (let i = 2026; i >= 1920; i--) {
      years.push(i.toString());
    }
    return years;
  };
  const years = getYears();

  const handleVehicleTypeChange = (value) => {
    setFormData({
      ...formData,
      vehicleType: value,
      make: '',
      model: '',
      service: ''
    });
  };

  const handleMakeChange = (value) => {
    setFormData({ ...formData, make: value, model: '' });
  };
  
  const handleContactPreferenceChange = (preference) => {
    setFormData(prev => ({
      ...prev,
      customerInfo: {
        ...prev.customerInfo,
        contactPreference: {
          ...prev.customerInfo.contactPreference,
          [preference]: !prev.customerInfo.contactPreference[preference]
        }
      }
    }))
  }

  const handleLookup = () => {
    toast({
      title: "🚧 Feature Coming Soon!",
      description: "Automatic vehicle lookup isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  const formatMakeName = (make) => {
    return make.replace(/SUV$|Truck$|Van$/, '');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-lg p-8">
      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
        <p className="text-center text-primary font-semibold mb-3">Have a US license plate?</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-grow">
            <Label htmlFor="licenseState">State</Label>
            <Input id="licenseState" placeholder="e.g., IL" className="bg-gray-800 border-gray-700" />
          </div>
          <div className="flex-grow">
            <Label htmlFor="licensePlate">Plate Number</Label>
            <Input id="licensePlate" placeholder="e.g., RIOTOUS" className="bg-gray-800 border-gray-700" />
          </div>
          <div className="self-end">
            <Button type="button" onClick={handleLookup} className="w-full sm:w-auto bg-primary text-gray-900 hover:bg-primary/90">
              Look Up
            </Button>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-400">OR</div>

      <div>
        <Label htmlFor="vehicleType">Vehicle Type <span className="text-primary">*</span></Label>
        <Select
          value={formData.vehicleType}
          onValueChange={handleVehicleTypeChange}
          required
        >
          <SelectTrigger className="bg-gray-800 border-gray-700">
            <SelectValue placeholder="Select vehicle type" />
          </SelectTrigger>
          <SelectContent>
            {vehicleTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {formData.vehicleType && (
        <>
          <div>
            <Label htmlFor="year">Year <span className="text-primary">*</span></Label>
            <Select
              value={formData.year}
              onValueChange={(value) => setFormData({ ...formData, year: value })}
              required
            >
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="make">Make <span className="text-primary">*</span></Label>
            <Select
              value={formData.make}
              onValueChange={handleMakeChange}
              required
              disabled={!formData.vehicleType}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select make" />
              </SelectTrigger>
              <SelectContent>
                {getMakesForVehicleType(formData.vehicleType).map((make) => (
                  <SelectItem key={make} value={make}>
                    {formatMakeName(make)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="model">Model <span className="text-primary">*</span></Label>
            <Select
              value={formData.model}
              onValueChange={(value) => setFormData({ ...formData, model: value })}
              required
              disabled={!formData.make}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {formData.make && getModels(formData.make).map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="service">Service Package <span className="text-primary">*</span></Label>
            <Select
              value={formData.service}
              onValueChange={(value) => setFormData({ ...formData, service: value })}
              required
            >
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                {formData.vehicleType && services[formData.vehicleType] && services[formData.vehicleType].map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      <div>
        <Label htmlFor="name">Full Name <span className="text-primary">*</span></Label>
        <Input
          id="name"
          required
          className="bg-gray-800 border-gray-700"
          value={formData.customerInfo.name}
          onChange={(e) => setFormData({
            ...formData,
            customerInfo: { ...formData.customerInfo, name: e.target.value }
          })}
        />
      </div>

      <div>
        <Label htmlFor="email">Email <span className="text-primary">*</span></Label>
        <Input
          id="email"
          type="email"
          required
          className="bg-gray-800 border-gray-700"
          value={formData.customerInfo.email}
          onChange={(e) => setFormData({
            ...formData,
            customerInfo: { ...formData.customerInfo, email: e.target.value }
          })}
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number <span className="text-primary">*</span></Label>
        <Input
          id="phone"
          type="tel"
          required
          pattern="[0-9]{10}"
          title="Please enter a 10-digit phone number without dashes or spaces."
          className="bg-gray-800 border-gray-700"
          value={formData.customerInfo.phone}
          onChange={(e) => {
            const { value } = e.target;
            // Allow only numbers and limit to 10 digits
            if (/^\d*$/.test(value) && value.length <= 10) {
              setFormData({
                ...formData,
                customerInfo: { ...formData.customerInfo, phone: value }
              });
            }
          }}
        />
      </div>

      <div>
        <Label>Preferred Contact Method(s)</Label>
        <div className="flex items-center space-x-6 mt-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="contactEmail" checked={formData.customerInfo.contactPreference.email} onCheckedChange={() => handleContactPreferenceChange('email')} />
            <Label htmlFor="contactEmail" className="font-normal text-gray-400">Email</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="contactText" checked={formData.customerInfo.contactPreference.text} onCheckedChange={() => handleContactPreferenceChange('text')} />
            <Label htmlFor="contactText" className="font-normal text-gray-400">Text</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="contactCall" checked={formData.customerInfo.contactPreference.call} onCheckedChange={() => handleContactPreferenceChange('call')} />
            <Label htmlFor="contactCall" className="font-normal text-gray-400">Call</Label>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="vehicleDetails">Additional Details</Label>
        <Textarea
          id="vehicleDetails"
          placeholder="Color, trim, any special requirements..."
          rows={3}
          className="bg-gray-800 border-gray-700"
          value={formData.customerInfo.vehicleDetails}
          onChange={(e) => setFormData({
            ...formData,
            customerInfo: { ...formData.customerInfo, vehicleDetails: e.target.value }
          })}
        />
      </div>

      <div className="bg-primary/10 border-l-4 border-primary text-gray-300 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-primary" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">
              Please note: Your selected date and time are a request. We will contact you to confirm your appointment details.
            </p>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full bg-primary text-gray-900 hover:bg-primary/90" disabled={!formData.vehicleType || !formData.service}>
        Continue to Date Selection
      </Button>
    </form>
  );
};

export default BookingForm;