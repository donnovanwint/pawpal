import Link from 'next/link';
import Image from 'next/image';

const bentoWords = [
  'Instant Answers',
  'Pet Care Simplified',
  'Expert Advice',
  '24/7 Assistance',
  'Tailored Recommendations',
  'Easy-to-Use',
  'Reliable Info',
  'Any Pet, Any Question',
  'Informed Decisions',
  'Personalized Care',
  'Pet Parenting Made Easy',
  'Interactive Guidance',
  'Trustworthy Tips',
  'Convenient Access',
];

function getRandomColor() {
  const colors = [
    'rgb(255, 111, 97)',
    'rgb(0, 128, 128)',
    'rgb(72, 183, 167)',
    'rgb(25, 25, 112)',
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const opacity = 0.4 + Math.random() * 0.6;
  return randomColor.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
}

export default function Home() {
  return (
    <div>
      <div className='relative home-hero'>
        <div
          aria-hidden='true'
          className='absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20'
        >
          <div className='blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700'></div>
          <div className='blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600'></div>
        </div>
        <div className='container'>
          <div className='relative pt-16 ml-auto'>
            <div>
              <div className='text-center mx-auto'>
                <h1 className='text-gray-900 dark:text-white font-bold'>
                  Your Personal Assistant for a{' '}
                  <span className='accent-1'>Happier</span>,{' '}
                  <span className='accent-2'>Healthier Pet</span>
                </h1>
                <p className='mt-8 font-medium'>
                  Instant Answers to All Your Pet Questions, Anytime!
                </p>
              </div>
              <div className='flex justify-center gap-4 mt-8'>
                <Link href='/login' className='cta'>
                  Get started
                </Link>
                <Link href='/demo' className='cta cta-secondary'>
                  Try Now
                </Link>
              </div>
              <div className='bento-grid'>
                {bentoWords.map((word, i) => {
                  const bgColor = getRandomColor();
                  const textColor =
                    bgColor.startsWith('rgba(0, 128, 128') ||
                    bgColor.startsWith('rgba(25, 25, 112')
                      ? 'white'
                      : 'initial';

                  return (
                    <p
                      className='bento-word'
                      key={i}
                      style={{ backgroundColor: bgColor, color: textColor }}
                    >
                      {word}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className='about'>
        <div className='container grid'>
          <div>
            <h2>Driven by a Passion for Pets</h2>
            <p>
              At pawPal, we believe every pet deserves the best care, and every
              pet owner deserves the right information. Our app bridges this
              gap, offering immediate, trustworthy advice for your pet-related
              questions. We're dedicated to enhancing the bond between you and
              your pet through knowledge and understanding.
            </p>
          </div>
          <div>
            <Image
              src='/about-photo.avif'
              alt='About'
              width={500}
              height={500}
            />
          </div>
        </div>
      </section>
      <section className='features'>
        <div className='container'>
          <h2>Empowering Every Pet Owner with Knowledge</h2>
          <div className='grid'>
            <div className='feature-1'>
              <div className='feature-1-content'>
                <h3 className='font-semibold'>Instant Answers</h3>
                <p>
                  Get answers to your pet questions in <span>seconds</span>. Our
                  AI-powered app is always available to help you find the
                  information <span>you need</span>.
                </p>
              </div>
            </div>
            <div className='feature-2'>
              <div className='feature-2-content'>
                <h3 className='font-semibold'>Tailored Recommendations</h3>
                <p>
                  Get customized recommendations for your pet's needs, including{' '}
                  <span>food</span>, <span>toys</span>, and <span>more</span>.
                </p>
              </div>
            </div>
            <div className='feature-3'>
              <div className='feature-3-content'>
                <h3 className='font-semibold'>Always Accessible</h3>
                <p>
                  Your go-to source for pet queries, <span>anytime</span>,{' '}
                  <span>anywhere</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='get-started'>
        <div className='container'>
          <h2>Get Started</h2>
          <p>
            Discover a simpler, more joyful way of caring for your pet – where
            every question finds an answer and every moment counts
          </p>
          <div className='flex gap-4 mt-8'>
            <Link href='/login' className='cta'>
              Get started
            </Link>
            <Link href='/demo' className='cta cta-secondary'>
              Try Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
