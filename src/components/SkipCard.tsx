import { Skip } from "@/services/skipService";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Trash2, Truck, Shield, Calendar, CreditCard, CheckCircle, Filter, ArrowRight, X, AlertTriangle, ArrowLeft, Loader2, Phone, Mail } from 'lucide-react';
import { Button } from "./ui/button";


export const SkipCard = ({ skip, isSelected, onSelect }: {
    skip: Skip;
    isSelected: boolean;
    onSelect: () => void;
  }) => {
    const totalPrice = skip.price_before_vat * (1 + (skip.vat || 20) / 100);
  
    return (
      <Card className={`relative cursor-pointer transition-all duration-300 hover:shadow-lg bg-gray-800 border-gray-700 ${isSelected ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
        }`} onClick={onSelect}>
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={`/images/${skip.size}-yarder-skip.jpg`}
              alt={`${skip.size} yard skip`}
              className="w-full h-48 object-cover rounded-t-lg"
              onError={(e) => {
                // Fallback to a default image if the specific size image is not found
                const target = e.target as HTMLImageElement;
                target.src = '/images/8-yarder-skip.jpg'; // Default image
              }}
              loading="lazy"
            />
            <Badge className="absolute top-3 right-3 bg-blue-500 text-white">
              {skip.size} Yards
            </Badge>
            {!skip.allowed_on_road && (
              <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-yellow-500 text-black px-2 py-1 rounded text-xs">
                <AlertTriangle className="w-3 h-3" />
                <span>Not Road Legal</span>
              </div>
            )}
            {isSelected && (
              <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1 z-10">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
  
          <div className="p-4 space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-white">{skip.size} Yard Skip</h3>
              <p className="text-sm text-gray-400">{skip.hire_period_days} day hire period</p>
            </div>
  
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Price (exc. VAT)</span>
                <span className="text-sm font-medium text-white">£{skip.price_before_vat}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">VAT ({skip.vat}%)</span>
                <span className="text-sm font-medium text-white">£{(skip.price_before_vat * skip.vat / 100).toFixed(0)}</span>
              </div>
              <div className="border-t border-gray-700 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-xl font-bold text-blue-400">£{totalPrice.toFixed(0)}</span>
                </div>
              </div>
            </div>
  
            <div className="flex flex-wrap gap-2">
              {skip.allowed_on_road && (
                <Badge variant="secondary" className="text-xs bg-yellow-500 text-black">
                  Road Legal
                </Badge>
              )}
              {skip.allows_heavy_waste && (
                <Badge variant="secondary" className="text-xs bg-blue-600 text-white">
                  Heavy Waste OK
                </Badge>
              )}
            </div>
  
            <Button
              className={`w-full mt-4 ${isSelected
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-white border-gray-600'
                }`}
              variant={isSelected ? "default" : "outline"}
            >
              {isSelected ? 'Selected' : 'Select This Skip'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }