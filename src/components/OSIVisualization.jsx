// src/components/OSIVisualization.jsx
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Zap, Keyboard, Server, Globe, Network, Cloud, Database } from 'lucide-react';

const OSIVisualization = () => {
  const [inputValue, setInputValue] = useState('');
  const [activeSteps, setActiveSteps] = useState([]);
  const [activeOSILayers, setActiveOSILayers] = useState([]);
  const [currentDetailStep, setCurrentDetailStep] = useState(null);

  const osiLayers = [
    { id: 7, name: 'Application', color: 'bg-purple-500' },
    { id: 6, name: 'Presentation', color: 'bg-indigo-500' },
    { id: 5, name: 'Session', color: 'bg-blue-500' },
    { id: 4, name: 'Transport', color: 'bg-green-500' },
    { id: 3, name: 'Network', color: 'bg-yellow-500' },
    { id: 2, name: 'Data Link', color: 'bg-orange-500' },
    { id: 1, name: 'Physical', color: 'bg-red-500' }
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
    <div className="w-full max-w-6xl mx-auto p-4">
      <Card className="p-6">
        <div className="mb-8">
          <label className="block text-lg font-semibold mb-2">Enter a web address:</label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type something like example.com"
          />
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">OSI Model Layers</h3>
            <div className="space-y-2">
              {osiLayers.map((layer) => (
                <div
                  key={layer.id}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    activeOSILayers.includes(layer.id)
                      ? `${layer.color} text-white transform scale-105`
                      : 'bg-gray-100'
                  }`}
                >
                  <span className="font-medium">
                    {layer.id}. {layer.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Journey Steps</h3>
            <div className="space-y-4">
              {detailedSteps.map((category) => (
                <div
                  key={category.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    activeSteps.includes(category.id)
                      ? 'bg-blue-100 transform scale-105'
                      : 'bg-gray-100'
                  }`}
                  onClick={() => setCurrentDetailStep(
                    currentDetailStep === category.id ? null : category.id
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <category.icon
                      className={`w-6 h-6 ${
                        activeSteps.includes(category.id) ? 'text-blue-500' : 'text-gray-500'
                      }`}
                    />
                    <span className="font-medium">{category.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Detailed Steps</h3>
            <div className="space-y-4">
              {currentDetailStep && 
                detailedSteps
                  .find(cat => cat.id === currentDetailStep)
                  ?.steps.map((step) => (
                    <div
                      key={step.id}
                      className="p-4 rounded-lg bg-gray-50"
                    >
                      <div className="font-medium">{step.name}</div>
                      <div className="text-sm text-gray-600">{step.description}</div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OSIVisualization;