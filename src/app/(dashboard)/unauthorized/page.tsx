// frontend/src/app/(dashboardLayout)/unauthorized/page.tsx
import Link from 'next/link';
import { Button } from '@heroui/button';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        You do not have permission to access this page.
      </p>
      <Link href="/home" passHref> {/* Redirect to /home, not just / */}
        <Button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Go to Homepage
        </Button>
      </Link>
    </div>
  );
}