import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Zap, Keyboard, Server, Globe, Network, Cloud, Database } from 'lucide-react';

const OSIVisualization = () => {
  const [inputValue, setInputValue] = useState('');
  const [activeSteps, setActiveSteps] = useState([]);
  const [activeOSILayers, setActiveOSILayers] = useState([]);
  const [currentDetailStep, setCurrentDetailStep] = useState(null);

  const osiLayers = [
    { id: 7, name: 'Application', color: 'bg-purple-600' },
    { id: 6, name: 'Presentation', color: 'bg-indigo-600' },
    { id: 5, name: 'Session', color: 'bg-blue-600' },
    { id: 4, name: 'Transport', color: 'bg-green-600' },
    { id: 3, name: 'Network', color: 'bg-yellow-600' },
    { id: 2, name: 'Data Link', color: 'bg-orange-600' },
    { id: 1, name: 'Physical', color: 'bg-red-600' }
  ];

  const detailedSteps = [
    {
      id: 1,
      category: 'Physical Input',
      icon: Keyboard,
      steps: [
        { id: '1a', name: 'Key Matrix Activation', description: 'Electrons flow through keyboard matrix when key is pressed' },
        { id: '1b', name: 'Signal Generation', description: 'Key press creates electrical signal in keyboard controller' },
        { id: '1c', name: 'Digital Conversion', description: 'Analog signal converted to digital keycode' }
      ]
    },
    {
      id: 2,
      category: 'Input Processing',
      icon: Zap,
      steps: [
        { id: '2a', name: 'USB Protocol', description: 'Digital signal transmitted via USB protocol to computer' },
        { id: '2b', name: 'Interrupt Handler', description: 'CPU receives hardware interrupt from USB controller' },
        { id: '2c', name: 'Driver Processing', description: 'Keyboard driver processes the keycode' }
      ]
    },
    {
      id: 3,
      category: 'OS & Browser',
      icon: Server,
      steps: [
        { id: '3a', name: 'OS Event Queue', description: 'Keypress event added to OS event queue' },
        { id: '3b', name: 'Browser Processing', description: 'Browser receives and processes keypress event' },
        { id: '3c', name: 'URL Parsing', description: 'Browser parses URL components (protocol, domain, path)' }
      ]
    },
    {
      id: 4,
      category: 'DNS Resolution',
      icon: Globe,
      steps: [
        { id: '4a', name: 'Local DNS Cache', description: 'Browser checks local DNS cache' },
        { id: '4b', name: 'Recursive DNS', description: 'Query sent to recursive DNS resolver (ISP/8.8.8.8)' },
        { id: '4c', name: 'Root NS Query', description: 'Resolver queries root nameservers for TLD servers' },
        { id: '4d', name: 'TLD NS Query', description: 'TLD nameservers queried for authoritative nameservers' },
        { id: '4e', name: 'Auth NS Query', description: 'Authoritative nameservers return final IP address' }
      ]
    },
    {
      id: 5,
      category: 'Network Connection',
      icon: Network,
      steps: [
        { id: '5a', name: 'TCP Handshake', description: 'Client initiates TCP 3-way handshake with server' },
        { id: '5b', name: 'TLS Setup', description: 'TLS negotiation for HTTPS encryption' }
      ]
    },
    {
      id: 6,
      category: 'CDN & Security',
      icon: Cloud,
      steps: [
        { id: '6a', name: 'Cloudflare Edge', description: 'Request hits nearest Cloudflare edge server' },
        { id: '6b', name: 'DDoS Protection', description: 'Traffic analyzed for DDoS patterns' },
        { id: '6c', name: 'WAF Rules', description: 'Web Application Firewall checks request against security rules' },
        { id: '6d', name: 'Cache Check', description: 'CDN checks if content is cached at edge' }
      ]
    },
    {
      id: 7,
      category: 'Origin Server',
      icon: Database,
      steps: [
        { id: '7a', name: 'Load Balancer', description: 'Request distributed across server pool' },
        { id: '7b', name: 'Application Server', description: 'Web server processes request' },
        { id: '7c', name: 'Response Journey', description: 'Response travels back through CDN to user' }
      ]
    }
  ];

  useEffect(() => {
    const handleInput = () => {
      if (inputValue.length === 0) {
        setActiveSteps([]);
        setActiveOSILayers([]);
        setCurrentDetailStep(null);
        return;
      }

      const newActiveSteps = [];
      const newActiveLayers = [];

      if (inputValue.length > 0) {
        newActiveSteps.push(1);
        newActiveLayers.push(1);
      }
      if (inputValue.length > 2) {
        newActiveSteps.push(2);
        newActiveLayers.push(2);
      }
      if (inputValue.length > 4) {
        newActiveSteps.push(3);
        newActiveLayers.push(7, 6);
      }
      if (inputValue.length > 6) {
        newActiveSteps.push(4);
        newActiveLayers.push(5, 4, 3);
      }
      if (inputValue.includes('.')) {
        newActiveSteps.push(5, 6, 7);
      }

      setActiveSteps(newActiveSteps);
      setActiveOSILayers(newActiveLayers);
    };

    handleInput();
  }, [inputValue]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <Card className="p-6 shadow-lg">
          <div className="mb-8">
            <label className="block text-xl font-semibold mb-2 text-gray-800">
              Enter a web address:
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              placeholder="Type something like example.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* OSI Model Layers */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">OSI Model Layers</h3>
              <div className="space-y-2">
                {osiLayers.map((layer) => (
                  <div
                    key={layer.id}
                    className={`p-4 rounded-lg transition-all duration-300 transform ${
                      activeOSILayers.includes(layer.id)
                        ? `${layer.color} text-white scale-105`
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <span className="font-medium text-lg">
                      {layer.id}. {layer.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Journey Steps */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Journey Steps</h3>
              <div className="space-y-3">
                {detailedSteps.map((category) => (
                  <div
                    key={category.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      activeSteps.includes(category.id)
                        ? 'bg-blue-100 transform scale-105'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    onClick={() => setCurrentDetailStep(
                      currentDetailStep === category.id ? null : category.id
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <category.icon
                        className={`w-6 h-6 ${
                          activeSteps.includes(category.id) ? 'text-blue-600' : 'text-gray-600'
                        }`}
                      />
                      <span className="font-medium text-lg">{category.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Steps */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Detailed Steps</h3>
              <div className="space-y-3">
                {currentDetailStep && 
                  detailedSteps
                    .find(cat => cat.id === currentDetailStep)
                    ?.steps.map((step) => (
                      <div
                        key={step.id}
                        className="p-4 rounded-lg bg-white shadow-md border border-gray-200"
                      >
                        <div className="font-medium text-lg text-gray-800 mb-1">{step.name}</div>
                        <div className="text-gray-600">{step.description}</div>
                      </div>
                    ))}
                {!currentDetailStep && (
                  <div className="text-gray-500 italic">
                    Click on a journey step to see detailed information
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OSIVisualization;