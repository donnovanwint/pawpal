import Link from 'next/link';

export const metadata = {
  title: 'PawPawl Pricing',
  description: 'Pricing page for PawPawl',
};

export default function Pricing() {
  return (
    <div className='container'>
      <div className='pricing-table hidden mt-16 lg:block'>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='py-8 pr-4'></th>
              <th className='px-4 py-8 text-center'>
                <span className='text-base font-semibold text-secondary'>
                  Free
                </span>
                <p className='mt-6 text-4xl font-bold'>$0</p>
                <p className='mt-2 text-base font-normal text-gray-500'>Free</p>
              </th>
              <th className='px-4 py-8 text-center false'>
                <span className='text-base font-semibold text-secondary'>
                  Pro
                </span>
                <p className='mt-6 text-4xl font-bold false'>$15</p>
                <p className='mt-2 text-base font-normal text-gray-500'>
                  /month
                </p>
              </th>
              <th className='px-4 py-8 text-center foreground rounded-t-xl'>
                <span className='text-base font-semibold px-4 py-2 text-secondary bg-[#faf9f6] rounded-lg'>
                  ✨ Ultimate
                </span>
                <p className='mt-6 text-4xl font-bold text-white'>$25</p>
                <p className='mt-2 text-base font-normal text-gray-200'>
                  /month
                </p>
              </th>
              <th className='px-4 py-8 text-center false'>
                <span className='text-base font-semibold text-secondary'>
                  Enterprise
                </span>
                <p className='mt-6 text-4xl font-bold false'>$35</p>
                <p className='mt-2 text-base font-normal text-gray-500'>
                  /month
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='py-4 pr-4 font-medium border-b border-gray-200'>
                Customizable Pet Profiles
              </td>
              <td className='px-4 py-4 text-center border-b border-gray-200'>
                1
              </td>
              <td className='px-4 py-4 text-center border-b border-gray-200'>
                3
              </td>
              <td className='px-4 py-4 text-center border-b text-white foreground border-white/20'>
                10
              </td>
              <td className='px-4 py-4 text-center border-b border-gray-200'>
                Unlimited
              </td>
            </tr>
            <tr>
              <td className='py-4 pr-4 font-medium border-b border-gray-200'>
                Monthly questions limit
              </td>
              <td className='px-4 py-4 text-center border-b border-gray-200'>
                500
              </td>
              <td className='px-4 py-4 text-center border-b border-gray-200'>
                2,000
              </td>
              <td className='px-4 py-4 text-center border-b text-white foreground border-white/20'>
                5,000
              </td>
              <td className='px-4 py-4 text-center border-b border-gray-200'>
                Unlimited
              </td>
            </tr>
            <tr>
              <td className='py-4 pr-4 font-medium border-b border-gray-200'>
                New feature early access
              </td>
              <td className='px-4 py-4 text-center border-b border-gray-200'>
                -
              </td>
              <td className='px-4 py-4 text-center border-b border-gray-200'>
                -
              </td>
              <td className='px-4 py-4 text-center border-b text-white foreground border-white/20'>
                -
              </td>
              <td className='px-4 py-4 text-center border-b border-gray-200'>
                <svg
                  className='w-5 h-5 mx-auto'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </td>
            </tr>
            <tr>
              <td className='py-4 pr-4 font-medium border-b border-gray-200'>
                Customer support
              </td>
              <td className='px-4 py-4 text-center border-b border-gray-200'>
                -
              </td>
              <td className='px-4 py-4 text-center border-b border-gray-200'>
                Email
              </td>
              <td className='px-4 py-4 text-center border-b text-white foreground border-white/20'>
                Email
              </td>
              <td className='px-4 py-4 text-center border-b border-gray-200'>
                Email with priority
              </td>
            </tr>
            <tr>
              <td className='py-6 pr-4'></td>
              <td className='px-4 py-6 text-center'>
                <Link
                  className='inline-flex items-center font-semibold text-gray-800 hover:text-secondary px-3 py-2 border border-gray-800 rounded-lg'
                  href='/login'
                >
                  Get Started
                </Link>
              </td>
              <td className='px-4 py-6 text-center'>
                <Link
                  className='inline-flex items-center font-semibold text-gray-800 hover:text-secondary px-3 py-2 border border-gray-800 rounded-lg'
                  href='/login'
                >
                  Get Started
                </Link>
              </td>
              <td className='flex items-center'>
                <Link
                  className='flex justify-center items-center font-semibold px-4 py-6 text-center text-white primary-cta-bg w-full rounded-b-xl'
                  href='/login'
                >
                  Get Started
                </Link>
              </td>
              <td className='px-4 py-6 text-center'>
                <Link
                  className='inline-flex items-center font-semibold text-gray-800 hover:text-secondary px-3 py-2 border border-gray-800 rounded-lg'
                  href='/login'
                >
                  Get Started
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='pricing-table-mobile block mt-12 border-t border-b border-gray-200 divide-y divide-gray-200 lg:hidden'>
        <div className='grid grid-cols-4 text-center divide-x divide-gray-200'>
          <div className='px-2 py-2'>
            <span className='text-sm font-medium text-secondary'> Free </span>
            <p className='mt-2 text-xl font-bold'>$0</p>
            <span className='mt-1 text-sm font-normal text-gray-500'>Free</span>
          </div>
          <div className='px-2 py-2'>
            <span className='text-sm font-medium text-secondary'> Pro </span>
            <p className='mt-2 text-xl font-bold'>
              $15
              <span className='mt-1 text-sm font-normal text-gray-500'>
                /month
              </span>
            </p>
            <span className='mt-1 text-sm font-normal text-gray-500'>
              Billed monthly
            </span>
          </div>
          <div className='px-2 py-2'>
            <span className='text-sm font-medium text-secondary'>Ultimate</span>
            <p className='mt-2 text-xl font-bold'>
              $25
              <span className='mt-1 text-sm font-normal text-gray-500'>
                /month
              </span>
            </p>
            <span className='mt-1 text-sm font-normal text-gray-500'>
              Billed monthly
            </span>
          </div>
          <div className='px-2 py-2'>
            <span className='text-sm font-medium text-secondary'>
              Enterprise
            </span>
            <p className='mt-2 text-xl font-bold'>
              $35
              <span className='mt-1 text-sm font-normal text-gray-500'>
                /month
              </span>
            </p>
            <span className='mt-1 text-sm font-normal text-gray-500'>
              Billed monthly
            </span>
          </div>
        </div>
        <div className='px-2 py-4 sm:px-4'>
          <p className='font-semibold'>Customizable Pet Profiles </p>
        </div>
        <div className='grid grid-cols-4 text-center divide-x divide-gray-200'>
          <div className='px-2 py-2'>1</div>
          <div className='px-2 py-2'>3</div>
          <div className='px-2 py-2'>10</div>
          <div className='px-2 py-2'>Unlimited</div>
        </div>
        <div className='px-2 py-4 sm:px-4'>
          <p className='font-semibold'>Monthly questions limit</p>
        </div>
        <div className='grid grid-cols-4 text-center divide-x divide-gray-200'>
          <div className='px-2 py-2'>500</div>
          <div className='px-2 py-2'>2,000</div>
          <div className='px-2 py-2'>5,000</div>
          <div className='px-2 py-2'>Unlimited</div>
        </div>
        <div className='px-2 py-4 sm:px-4'>
          <p className='font-semibold'>New feature early access</p>
        </div>
        <div className='grid grid-cols-4 text-center divide-x divide-gray-200'>
          <div className='px-2 py-2'>-</div>
          <div className='px-2 py-2'>-</div>
          <div className='px-2 py-2'>-</div>
          <div className='px-2 py-2'>
            <svg
              className='w-5 h-5 mx-auto'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
        </div>
        <div className='px-2 py-4 sm:px-4'>
          <p className='font-semibold'>Customer support</p>
        </div>
        <div className='grid grid-cols-4 text-center divide-x divide-gray-200'>
          <div className='px-2 py-2'>-</div>
          <div className='px-2 py-2'>Email</div>
          <div className='px-2 py-2'>Email</div>
          <div className='px-2 py-2'>Email with priority</div>
        </div>
        <div className='grid grid-cols-4 text-center divide-x divide-gray-200'>
          <div className='px-1 py-2 sm:px-4 pricing-table-mobile-grid'>
            <span className='text-sm font-medium text-secondary'> Free </span>
            <p className='mt-2 text-xl font-bold'>$0</p>
            <span className='mt-1 text-sm font-normal text-gray-500'>Free</span>
            <Link
              className='flex items-center justify-center w-full px-1 py-2 mt-5 text-xs text-secondary transition-all duration-200 bg-white border border-gray-900 rounded-md hover:bg-gray-100'
              role='button'
              href='/login'
            >
              Get Started
            </Link>
          </div>
          <div className='px-1 py-2 sm:px-4 pricing-table-mobile-grid'>
            <span className='text-sm font-medium text-secondary'> Pro </span>
            <p className='mt-2 text-xl font-bold'>
              $15
              <span className='mt-1 text-sm font-normal text-gray-500'>
                /month
              </span>
            </p>
            <span className='mt-1 text-sm font-normal text-gray-500'>
              Billed monthly
            </span>
            <Link
              className='flex items-center justify-center w-full px-1 py-2 mt-5 text-xs text-secondary transition-all duration-200 bg-white border border-gray-900 rounded-md hover:bg-gray-100'
              role='button'
              href='/login'
            >
              Get Started
            </Link>
          </div>
          <div className='px-1 py-2 sm:px-4 pricing-table-mobile-grid'>
            <span className='text-sm font-medium text-secondary'>Ultimate</span>
            <p className='mt-2 text-xl font-bold'>
              $25
              <span className='mt-1 text-sm font-normal text-gray-500'>
                /month
              </span>
            </p>
            <span className='mt-1 text-sm font-normal text-gray-500'>
              Billed monthly
            </span>
            <Link
              className='flex items-center justify-center w-full px-1 py-2 mt-5 text-xs text-white transition-all duration-200 primary-cta-bg border border-transparent rounded-md hover:primary-cta-bg/90'
              role='button'
              href='/login'
            >
              Get Started
            </Link>
          </div>
          <div className='px-1 pt-2 pb-2 sm:px-4 pricing-table-mobile-grid'>
            <span className='text-sm font-medium text-secondary'>
              Enterprise
            </span>
            <p className='mt-2 text-xl font-bold'>
              $35
              <span className='mt-1 text-sm font-normal text-gray-500'>
                /month
              </span>
            </p>
            <span className='mt-1 text-sm font-normal text-gray-500'>
              Billed monthly
            </span>
            <a
              className='flex items-center justify-center w-full px-1 py-2 mt-5 text-xs text-secondary transition-all duration-200 bg-white border border-gray-900 rounded-md hover:bg-gray-100'
              role='button'
              href='/login'
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
