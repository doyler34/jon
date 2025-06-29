"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setDebugInfo("");

    try {
      // First, let's check if our environment variables are loaded
      const envCheck = await fetch('/api/test-env');
      const envData = await envCheck.json();
      setDebugInfo(`Environment check: Admin password exists: ${envData.hasAdminPassword}, Length: ${envData.adminPasswordLength}`);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        // Use window.location.href for more reliable navigation
        window.location.href = '/studio-portal-2024';
      } else {
        setError(data.error || 'Login failed');
        setDebugInfo(prev => `${prev}\nLogin response status: ${response.status}`);
      }
    } catch (error) {
      setError('An error occurred during login');
      setDebugInfo(prev => `${prev}\nError: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-96 p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          {debugInfo && (
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
              {debugInfo}
            </pre>
          )}
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Card>
    </div>
  );
} 