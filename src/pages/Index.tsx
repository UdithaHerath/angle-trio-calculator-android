import TrigCalculator from '@/components/TrigCalculator';

const Index = () => {
  return (
    <div className="min-h-screen p-4 bg-[var(--gradient-background)]">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Angle Trio Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Calculate sin, cos, and tan values for any angle with precision and ease
          </p>
        </div>
        
        <TrigCalculator />
      </div>
    </div>
  );
};

export default Index;
