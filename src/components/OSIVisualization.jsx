import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Zap, Keyboard, Server, Globe, Network, Cloud, Database } from 'lucide-react';

const OSIVisualization = () => {
  const [inputValue, setInputValue] = useState('');
  const [activeSteps, setActiveSteps] = useState([]);
  const [activeOSILayers, setActiveOSILayers] = useState([]);
  const [currentDetailStep, setCurrentDetailStep] = useState(null);

  const osiLayers = [
    { 
      id: 7, 
      name: 'Application', 
      color: 'bg-purple-600',
      description: 'Provides network services directly to end-users. Includes HTTP, FTP, DNS, SMTP, etc. This is where your browser and email client operate.'
    },
    { 
      id: 6, 
      name: 'Presentation', 
      color: 'bg-indigo-600',
      description: 'Handles data formatting, encryption, and compression. Ensures data is readable by the receiving system. Examples: SSL/TLS, JPEG, ASCII/Unicode conversion.'
    },
    { 
      id: 5, 
      name: 'Session', 
      color: 'bg-blue-600',
      description: 'Manages communication sessions between applications. Handles authentication, reconnection, and checkpointing. Example: NetBIOS, RPC.'
    },
    { 
      id: 4, 
      name: 'Transport', 
      color: 'bg-green-600',
      description: 'Ensures reliable data delivery between applications. Handles segmentation, flow control, and error correction. TCP provides reliable delivery, UDP for speed.'
    },
    { 
      id: 3, 
      name: 'Network', 
      color: 'bg-yellow-600',
      description: 'Routes data packets between different networks. Handles logical addressing (IP) and determines the best path for data. This is where routers operate.'
    },
    { 
      id: 2, 
      name: 'Data Link', 
      color: 'bg-orange-600',
      description: 'Provides reliable point-to-point delivery between directly connected nodes. Handles physical addressing (MAC), error detection. Examples: Ethernet, Wi-Fi.'
    },
    { 
      id: 1, 
      name: 'Physical', 
      color: 'bg-red-600',
      description: 'Transmits raw bits over physical medium. Deals with physical connections, voltage levels, cable specifications, etc. Examples: USB, Ethernet cable, fiber optics.'
    }
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
        { id: '4d', name: 'TLD Resolution', description: 'Different handling based on TLD:' },
        { id: '4d1', name: '.com/.net/.org', description: 'Standard resolution through VeriSign/registry operators' },
        { id: '4d2', name: '.gov', description: 'Restricted TLD, managed by US GSA with additional security requirements' },
        { id: '4d3', name: '.in/.us/.uk', description: 'Country-code TLDs with local registry policies and sometimes local presence requirements' },
        { id: '4d4', name: 'Special TLDs', description: '.edu (US education), .mil (US military), .int (international treaties) have strict registration requirements' },
        { id: '4e', name: 'Registry Process', description: 'TLD registry forwards to correct authoritative nameservers based on domain registration' },
        { id: '4f', name: 'Auth NS Query', description: 'Authoritative nameservers return final IP address' }
      ]
    },
    {
      id: 5,
      category: 'CDN & Security',
      icon: Cloud,
      steps: [
        { id: '5a', name: 'Initial Connection', description: 'DNS resolution points to nearest Cloudflare edge server' },
        { id: '5b', name: 'TCP Connection to CDN', description: 'Client establishes connection with Cloudflare edge' },
        { id: '5c', name: 'TLS Handshake', description: 'SSL/TLS negotiation with Cloudflare (using their SSL cert)' },
        { id: '5d', name: 'DDoS Protection', description: 'Traffic analyzed for DDoS patterns' },
        { id: '5e', name: 'WAF Rules', description: 'Web Application Firewall checks request against security rules' },
        { id: '5f', name: 'Cache Check', description: 'CDN checks if content is cached at edge' }
      ]
    },
    {
      id: 6,
      category: 'Origin Connection',
      icon: Network,
      steps: [
        { id: '6a', name: 'Origin TCP Handshake', description: 'If not cached, Cloudflare initiates connection to origin server' },
        { id: '6b', name: 'Origin TLS Setup', description: 'Secure connection established between Cloudflare and origin' }
      ]
    },
    {
      id: 7,
      category: 'Origin Server',
      icon: Database,
      steps: [
        { id: '7a', name: 'Load Balancer', description: 'Request distributed across server pool' },
        { id: '7b', name: 'Application Server', description: 'Web server processes request' },
        { id: '7c', name: 'Response Journey', description: 'Response travels back through CDN to user, possibly being cached' }
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
                    className={`p-4 rounded-lg transition-all duration-300 transform group relative ${
                      activeOSILayers.includes(layer.id)
                        ? `${layer.color} text-white scale-105`
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <span className="font-medium text-lg">
                      {layer.id}. {layer.name}
                    </span>
                    {/* Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute left-full top-0 ml-2 p-2 bg-gray-900 text-white text-sm rounded-lg w-64 z-10 pointer-events-none">
                      {layer.description}
                    </div>
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