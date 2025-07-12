import CoSecCotCalculator from '@/components/CoSecCotCalculator';

const CoFunctions = () => {
  return (
    <div className="min-h-screen p-4 bg-[var(--gradient-background)]">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent to-result bg-clip-text text-transparent">
            Co-Functions Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Calculate cos, sec, and cot values for any angle with precision and ease
          </p>
        </div>
        
        <CoSecCotCalculator />
      </div>
    </div>
  );
};

export default CoFunctions;