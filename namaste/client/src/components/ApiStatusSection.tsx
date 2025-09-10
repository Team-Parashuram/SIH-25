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
    }, [checkApiStatus]);

    return (
        <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            API Server Status
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <Button onClick={checkApiStatus} disabled={loading}>
            {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
                <CheckCircle className="h-4 w-4 mr-2" />
            )}
            Check Server Health
            </Button>
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
