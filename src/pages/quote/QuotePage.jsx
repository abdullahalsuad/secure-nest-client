import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AdditionalInfo from "../../components/quote/AdditionalInfo";
import QuoteResult from "../../components/quote/QuoteResult";
import QuoteForm from "../../components/quote/QuoteForm";

const QuotePage = () => {
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      age: "",
      gender: "",
      coverageAmount: "",
      duration: "",
      smoker: "no",
      occupation: "",
      annualIncome: "",
    },
  });

  const [quote, setQuote] = useState(null);

  const onSubmit = (data) => {
    setQuote(null);

    const baseRate = 0.001; // Base rate per lakh per year
    const age = Number.parseInt(data.age);
    const coverage = Number.parseInt(data.coverageAmount);
    const duration = Number.parseInt(data.duration);

    // Age factor
    let ageFactor = 1;
    if (age < 30) ageFactor = 0.8;
    else if (age < 40) ageFactor = 1;
    else if (age < 50) ageFactor = 1.5;
    else ageFactor = 2;

    // Gender factor
    const genderFactor = data.gender === "female" ? 0.9 : 1;

    // Smoker factor
    const smokerFactor = data.smoker === "yes" ? 1.5 : 1;

    // Calculate annual premium
    const annualPremium = Math.round(
      (coverage / 100000) *
        baseRate *
        100000 *
        ageFactor *
        genderFactor *
        smokerFactor
    );

    const monthlyPremium = Math.round(annualPremium / 12);

    setQuote({
      monthlyPremium,
      annualPremium,
      totalPremium: annualPremium * duration,
      coverage: coverage,
      duration: duration,
    });
  };

  return (
    <div className="min-h-screen  py-12 mt-15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get Your{" "}
            <span className="text-teal-600 dark:text-teal-400">
              Insurance Quote
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Calculate your personalized premium in just a few steps!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
          {/* Quote Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Tell Us About Yourself 👤
            </h2>

            {/* form */}
            <QuoteForm
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              register={register}
              errors={errors}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Quote Results */}
          <QuoteResult quote={quote} setQuote={setQuote} reset={reset} />
        </div>

        {/* Additional Info */}
        <AdditionalInfo />
      </div>
    </div>
  );
};

export default QuotePage;
