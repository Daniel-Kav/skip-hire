import React from "react";
import { X, CheckCircle, ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skip } from "@/services/skipService";

interface SkipModalProps {
  skip: Skip;
  onClose: () => void;
}

const SkipModal: React.FC<SkipModalProps> = ({ skip, onClose }) => {
  if (!skip) return null;
  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div className="absolute bottom-0 left-0 right-0 lg:inset-0 lg:m-auto lg:max-w-4xl lg:max-h-[80vh] lg:rounded-2xl bg-gray-800 border border-gray-700 shadow-2xl transform transition-all duration-300 ease-out translate-y-0 max-h-[90vh] overflow-y-auto">
        {/* Handle bar - Mobile only */}
        <div className="lg:hidden flex justify-center py-2 cursor-pointer" onClick={onClose}>
          <div className="w-12 h-1 bg-gray-600 rounded-full"></div>
        </div>

        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Your Selected Skip
            </h3>
            <button
              onClick={onClose}
              className="p-2 -mr-2 rounded-full hover:bg-gray-700 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Skip Details */}
            <div className="bg-gray-700/50 rounded-xl p-5">
              <h4 className="text-lg font-semibold text-white mb-4">Your Selection</h4>
              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={`/images/${skip.size}-yarder-skip.jpg`}
                    alt={`${skip.size} yard skip`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{skip.size} Yard Skip</h3>
                  <p className="text-gray-300 text-sm mt-1">
                    {skip.hire_period_days} days hire period
                  </p>
                  <div className="mt-2 flex items-center space-x-2">
                    {skip.allows_heavy_waste && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-500/20 text-yellow-300">
                        Heavy Waste Allowed
                      </span>
                    )}
                    {skip.allowed_on_road && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-500/20 text-blue-300">
                        Road Legal
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-white">
                    £{skip.price_before_vat.toFixed(2)}
                  </span>
                  <p className="text-xs text-gray-400">+VAT</p>
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-gray-700/50 rounded-xl p-5">
              <h4 className="text-lg font-semibold text-white mb-4">Price Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Skip Hire ({skip.hire_period_days} days)</span>
                  <span className="text-white">£{skip.price_before_vat.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">VAT ({skip.vat || 20}%)</span>
                  <span className="text-white">£{(skip.price_before_vat * (skip.vat || 20) / 100).toFixed(2)}</span>
                </div>
                {skip.transport_cost && (
                  <div className="flex justify-between">
                    <span className="text-gray-300">Delivery Fee</span>
                    <span className="text-white">£{skip.transport_cost.toFixed(2)}</span>
                  </div>
                )}
                <div className="h-px bg-gray-600 my-2"></div>
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <span className="text-xl font-bold text-blue-400">
                    £{(
                      skip.price_before_vat * (1 + (skip.vat || 20) / 100) +
                      (skip.transport_cost || 0)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 text-base font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={() => {
                    // Update progress to Permit Check step (index 3)
                    // You'll need to implement this state management
                  }}
                >
                  Check if you need a permit
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 py-3 text-base font-medium rounded-lg"
                  onClick={onClose}
                >
                  Back to skips
                </Button>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-gray-700/50 rounded-xl p-5">
              <h4 className="text-lg font-semibold text-white mb-3">Need help?</h4>
              <p className="text-gray-300 text-sm mb-4">
                Our team is available 7 days a week to answer any questions you may have.
              </p>
              <div className="flex items-center space-x-4">
                <a href="tel:+441234567890" className="flex items-center text-blue-400 hover:text-blue-300">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="text-sm">01234 567 890</span>
                </a>
                <a href="mailto:help@skiphire.com" className="flex items-center text-blue-400 hover:text-blue-300">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">help@skiphire.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkipModal; 