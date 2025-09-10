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
        <Card className="border-2 border-gray-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
            <CardTitle className="flex items-center gap-3 text-gray-800">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Search className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">NAMASTE Code Search</h3>
                    <p className="text-sm text-gray-600 font-normal">Search traditional medicine codes across systems</p>
                </div>
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Search Instructions</h4>
                <p className="text-sm text-blue-700">
                    Enter medical terms in English or traditional language (e.g., fever, jvara, kasa) to find corresponding codes across Ayurveda, Siddha, and Unani systems.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <Label htmlFor="search-query" className="text-sm font-semibold text-gray-700">
                        Search Term <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="search-query"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Enter search term (e.g., fever, jvara, kasa)"
                        className="w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md px-4 py-3"
                    />
                </div>
                <div className="space-y-3">
                    <Label htmlFor="search-system" className="text-sm font-semibold text-gray-700">
                        Medical System
                    </Label>
                    <Select value={searchSystem} onValueChange={setSearchSystem}>
                        <SelectTrigger className="w-full border-2 border-gray-300 focus:border-blue-500 rounded-md px-4 py-3">
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
            
            <div className="flex justify-center pt-4">
                <Button 
                    onClick={handleSearch} 
                    disabled={loading || !searchQuery.trim()}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 text-base font-medium rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin mr-3" />
                            Searching...
                        </>
                    ) : (
                        <>
                            <Search className="h-5 w-5 mr-3" />
                            Search NAMASTE Codes
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

export default CodeSearchSection;
