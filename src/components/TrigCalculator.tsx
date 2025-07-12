import React, { useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface TrigResults {
  sin: number;
  cos: number;
  tan: number;
}

const TrigCalculator = () => {
  const [theta, setTheta] = useState<string>('');
  const [angleMode, setAngleMode] = useState<'degrees' | 'radians'>('degrees');
  const [results, setResults] = useState<TrigResults | null>(null);
  const { toast } = useToast();

  const calculateTrig = () => {
    const numericTheta = parseFloat(theta);
    
    if (isNaN(numericTheta)) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid number for theta.",
        variant: "destructive"
      });
      return;
    }

    // Convert to radians if input is in degrees
    const thetaInRadians = angleMode === 'degrees' ? (numericTheta * Math.PI) / 180 : numericTheta;
    
    const sin = Math.sin(thetaInRadians);
    const cos = Math.cos(thetaInRadians);
    const tan = Math.tan(thetaInRadians);

    setResults({ sin, cos, tan });
    
    toast({
      title: "Calculation Complete",
      description: `Trigonometric values calculated for θ = ${numericTheta}${angleMode === 'degrees' ? '°' : ' rad'}`,
    });
  };

  const clearAll = () => {
    setTheta('');
    setResults(null);
  };

  const formatResult = (value: number): string => {
    if (Math.abs(value) < 1e-10) return '0';
    if (!isFinite(value)) return 'undefined';
    return value.toFixed(6);
  };

  const quickAngles = angleMode === 'degrees' 
    ? [0, 30, 45, 60, 90, 120, 135, 150, 180, 270, 360]
    : [0, Math.PI/6, Math.PI/4, Math.PI/3, Math.PI/2, 2*Math.PI/3, 3*Math.PI/4, 5*Math.PI/6, Math.PI, 3*Math.PI/2, 2*Math.PI];

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <Card className="shadow-[var(--shadow-calculator)] border-primary/20">
        <CardHeader className="text-center bg-gradient-to-r from-primary to-primary-glow text-primary-foreground rounded-t-lg">
          <CardTitle className="flex items-center justify-center gap-2 text-xl">
            <Calculator className="h-6 w-6" />
            Trigonometric Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Angle Mode Toggle */}
          <Tabs value={angleMode} onValueChange={(value) => setAngleMode(value as 'degrees' | 'radians')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="degrees">Degrees</TabsTrigger>
              <TabsTrigger value="radians">Radians</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Input Section */}
          <div className="space-y-3">
            <Label htmlFor="theta" className="text-sm font-medium">
              Enter θ value ({angleMode === 'degrees' ? 'degrees' : 'radians'}):
            </Label>
            <div className="flex gap-2">
              <Input
                id="theta"
                type="number"
                value={theta}
                onChange={(e) => setTheta(e.target.value)}
                placeholder={`e.g., ${angleMode === 'degrees' ? '45' : '1.5708'}`}
                className="flex-1"
                step="any"
              />
              <Button 
                onClick={calculateTrig}
                className="bg-calculator text-calculator-foreground hover:bg-calculator/90"
              >
                Calculate
              </Button>
            </div>
          </div>

          {/* Quick Angles */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Quick Angles:</Label>
            <div className="grid grid-cols-4 gap-2">
              {quickAngles.slice(0, 8).map((angle, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setTheta(angle.toString())}
                  className="text-xs h-8"
                >
                  {angleMode === 'degrees' ? `${angle}°` : `${angle === 0 ? '0' : angle.toFixed(3)}`}
                </Button>
              ))}
            </div>
          </div>

          {/* Results */}
          {results && (
            <Card className="bg-gradient-to-br from-result to-accent text-result-foreground shadow-[var(--shadow-result)]">
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-center">Results</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Label className="text-xs opacity-90">sin θ</Label>
                    <div className="font-mono text-lg font-bold">
                      {formatResult(results.sin)}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs opacity-90">cos θ</Label>
                    <div className="font-mono text-lg font-bold">
                      {formatResult(results.cos)}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs opacity-90">tan θ</Label>
                    <div className="font-mono text-lg font-bold">
                      {formatResult(results.tan)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              onClick={clearAll} 
              variant="outline" 
              className="flex-1"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrigCalculator;