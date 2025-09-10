import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search, Loader2 } from 'lucide-react';
import { useCodeSearch } from '../hooks/hooks';
import ResultDisplay from './ResultDisplay';

interface CodeSearchSectionProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    }

    const CodeSearchSection: React.FC<CodeSearchSectionProps> = ({ 
    searchQuery, 
    setSearchQuery 
    }) => {
    const [searchSystem, setSearchSystem] = useState('');
    const { data, loading, error, searchCodes } = useCodeSearch();

    const handleSearch = () => {
        searchCodes(searchQuery, searchSystem);
    };

    return (
        <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            NAMASTE Code Search
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="search-query">Search Term</Label>
                <Input
                id="search-query"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter search term (e.g., fever, jvara, kasa)"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="search-system">System</Label>
                <Select value={searchSystem} onValueChange={setSearchSystem}>
                <SelectTrigger>
                    <SelectValue placeholder="All Systems" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Systems</SelectItem>
                    <SelectItem value="ayurveda">Ayurveda</SelectItem>
                    <SelectItem value="siddha">Siddha</SelectItem>
                    <SelectItem value="unani">Unani</SelectItem>
                </SelectContent>
                </Select>
            </div>
            </div>
            <Button onClick={handleSearch} disabled={loading}>
            {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
                <Search className="h-4 w-4 mr-2" />
            )}
            Search NAMASTE Codes
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

export default CodeSearchSection;
