import React, { useState } from 'react';
import { Calculator, RotateCcw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface CoSecCotResults {
  cos: number;
  sec: number;
  cot: number;
}

const CoSecCotCalculator = () => {
  const [theta, setTheta] = useState<string>('');
  const [angleMode, setAngleMode] = useState<'degrees' | 'radians'>('degrees');
  const [results, setResults] = useState<CoSecCotResults | null>(null);
  const { toast } = useToast();

  const calculateCoSecCot = () => {
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
    
    const cos = Math.cos(thetaInRadians);
    const sec = 1 / Math.cos(thetaInRadians); // secant = 1/cos
    const cot = 1 / Math.tan(thetaInRadians); // cotangent = 1/tan

    setResults({ cos, sec, cot });
    
    toast({
      title: "Calculation Complete",
      description: `Co-functions calculated for θ = ${numericTheta}${angleMode === 'degrees' ? '°' : ' rad'}`,
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
      <Card className="shadow-[var(--shadow-calculator)] border-accent/20">
        <CardHeader className="text-center bg-gradient-to-r from-accent to-result text-accent-foreground rounded-t-lg">
          <CardTitle className="flex items-center justify-center gap-2 text-xl">
            <Calculator className="h-6 w-6" />
            Co-Functions Calculator
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
                onClick={calculateCoSecCot}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
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
            <Card className="bg-gradient-to-br from-accent to-primary text-accent-foreground shadow-[var(--shadow-result)]">
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-center">Results</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Label className="text-xs opacity-90">cos θ</Label>
                    <div className="font-mono text-lg font-bold">
                      {formatResult(results.cos)}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs opacity-90">sec θ</Label>
                    <div className="font-mono text-lg font-bold">
                      {formatResult(results.sec)}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs opacity-90">cot θ</Label>
                    <div className="font-mono text-lg font-bold">
                      {formatResult(results.cot)}
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

          {/* Navigation Slide Button */}
          <Link 
            to="/"
            className="block w-full group relative overflow-hidden rounded-lg bg-gradient-to-r from-primary to-primary-glow p-0.5 transition-all duration-300 hover:scale-105 animate-fade-in"
          >
            <div className="bg-card rounded-lg p-4 text-center transition-all duration-300 group-hover:bg-transparent">
              <div className="flex items-center justify-center gap-2 text-primary group-hover:text-primary-foreground transition-colors">
                <ArrowLeft className="h-4 w-4 transform transition-transform group-hover:-translate-x-1" />
                <span className="font-medium">Switch to Basic Functions</span>
              </div>
              <p className="text-xs text-muted-foreground group-hover:text-primary-foreground/80 mt-1">
                Calculate sin, cos, tan
              </p>
            </div>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoSecCotCalculator;