import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, CheckCircle, Loader2 } from 'lucide-react';
import { useApiStatus } from '../hooks/hooks';
import ResultDisplay from './ResultDisplay';

const ApiStatusSection: React.FC = () => {
    const { data, loading, error, checkApiStatus } = useApiStatus();

    useEffect(() => {
        checkApiStatus();
//eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card className="border-2 border-gray-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-100">
            <CardTitle className="flex items-center gap-3 text-gray-800">
                <div className="p-2 bg-green-100 rounded-lg">
                    <Activity className="h-5 w-5 text-green-600" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">System Health Monitor</h3>
                    <p className="text-sm text-gray-600 font-normal">Real-time API server status</p>
                </div>
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
            <div className="flex justify-center">
                <Button 
                    onClick={checkApiStatus} 
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-base font-medium rounded-lg shadow-md transition-all duration-200 disabled:opacity-50"
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin mr-3" />
                            Checking Status...
                        </>
                    ) : (
                        <>
                            <CheckCircle className="h-5 w-5 mr-3" />
                            Check Server Health
                        </>
                    )}
                </Button>
            </div>
            <ResultDisplay 
                data={data} 
                error={error} 
                loading={loading} 
            />
        </CardContent>
        </Card>
    );
};

export default ApiStatusSection;
