import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
    BarChart3, 
    Activity, 
    Database, 
    Globe, 
    TrendingUp, 
    Users, 
    FileText, 
    CheckCircle,
    AlertCircle,
    Clock,
    RefreshCw,
    PieChart,
    LineChart
    } from 'lucide-react';
import { useSystemStats } from '../hooks/useSystemStats';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    LineChart as RechartsLineChart,
    Line,
    Area,
    AreaChart
} from 'recharts';

    interface SystemStatus {
    service: string;
    status: 'online' | 'offline' | 'warning';
    responseTime: string;
    lastCheck: string;
    }

    const Dashboard: React.FC = () => {
    const { stats, loading, error, refreshStats } = useSystemStats();

    const systemCodesData = [
        { name: 'Ayurveda', codes: 2145, color: '#10B981' },
        { name: 'Siddha', codes: 1234, color: '#3B82F6' },
        { name: 'Unani', codes: 1188, color: '#8B5CF6' }
    ];

    const translationTrendsData = [
        { month: 'Jan', translations: 1200, success: 1152, failed: 48 },
        { month: 'Feb', translations: 1456, success: 1421, failed: 35 },
        { month: 'Mar', translations: 1789, success: 1752, failed: 37 },
        { month: 'Apr', translations: 2134, success: 2087, failed: 47 },
        { month: 'May', translations: 2567, success: 2511, failed: 56 },
        { month: 'Jun', translations: 2891, success: 2834, failed: 57 }
    ];

    const apiPerformanceData = [
        { time: '00:00', responseTime: 145, requests: 23 },
        { time: '04:00', responseTime: 132, requests: 18 },
        { time: '08:00', responseTime: 189, requests: 67 },
        { time: '12:00', responseTime: 234, requests: 89 },
        { time: '16:00', responseTime: 198, requests: 76 },
        { time: '20:00', responseTime: 167, requests: 45 }
    ];

    const userActivityData = [
        { name: 'Active Users', value: 89, fill: '#10B981' },
        { name: 'Inactive Users', value: 156, fill: '#EF4444' }
    ];

    const systemHealthData = [
        { name: 'CPU Usage', value: 65, fill: '#3B82F6' },
        { name: 'Memory Usage', value: 78, fill: '#F59E0B' },
        { name: 'Storage Usage', value: 45, fill: '#10B981' }
    ];

    // const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

    const [systemStatus] = useState<SystemStatus[]>([
        {
        service: 'NAMASTE Code System',
        status: 'online',
        responseTime: '145ms',
        lastCheck: '2 min ago'
        },
        {
        service: 'WHO ICD-11 API',
        status: 'online',
        responseTime: '320ms',
        lastCheck: '1 min ago'
        },
        {
        service: 'FHIR Bridge Service',
        status: 'online',
        responseTime: '89ms',
        lastCheck: '30 sec ago'
        },
        {
        service: 'Database Connection',
        status: 'warning',
        responseTime: '1.2s',
        lastCheck: '3 min ago'
        }
    ]);

    const [recentActivities] = useState([
        { time: '14:32', action: 'Dual coding generated for A001 (Jvara)', user: 'Dr. Sharma' },
        { time: '14:28', action: 'FHIR Condition created for patient-123', user: 'System' },
        { time: '14:25', action: 'New Ayurvedic codes uploaded', user: 'Admin' },
        { time: '14:20', action: 'WHO API translation successful', user: 'System' },
        { time: '14:15', action: 'Code search performed: fever symptoms', user: 'Dr. Patel' }
    ]);

    const getStatusIcon = (status: string) => {
        switch (status) {
        case 'online':
            return <CheckCircle className="h-4 w-4 text-green-500" />;
        case 'warning':
            return <AlertCircle className="h-4 w-4 text-yellow-500" />;
        case 'offline':
            return <AlertCircle className="h-4 w-4 text-red-500" />;
        default:
            return <Clock className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusBadge = (status: string) => {
        const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
        switch (status) {
        case 'online':
            return `${baseClasses} bg-green-100 text-green-800`;
        case 'warning':
            return `${baseClasses} bg-yellow-100 text-yellow-800`;
        case 'offline':
            return `${baseClasses} bg-red-100 text-red-800`;
        default:
            return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                    <p className="text-gray-600">Loading dashboard data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
            <div>
            <h1 className="text-3xl font-bold text-gray-900">System Dashboard</h1>
            <p className="text-gray-600 mt-2">
                Real-time monitoring of NAMASTE FHIR healthcare bridge system
            </p>
            </div>
            <Button 
            onClick={refreshStats} 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
            </Button>
        </div>

        {error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
                <AlertCircle className="h-4 w-4 inline mr-2" />
                {error} - Showing cached data
            </p>
            </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Total Medical Codes</CardTitle>
                <Database className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-blue-700">{stats?.totalCodes?.toLocaleString() || '4,567'}</div>
                <p className="text-xs text-gray-600 mt-1">
                Across 3 traditional systems
                </p>
            </CardContent>
            </Card>

            <Card className="border-2 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Translations Today</CardTitle>
                <Globe className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-green-700">{stats?.translationsToday || '156'}</div>
                <p className="text-xs text-gray-600 mt-1">
                Dual coding operations
                </p>
            </CardContent>
            </Card>

            <Card className="border-2 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Success Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-purple-700">{stats?.successRate || '97.8'}%</div>
                <p className="text-xs text-gray-600 mt-1">
                API translation accuracy
                </p>
            </CardContent>
            </Card>

            <Card className="border-2 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Active Users</CardTitle>
                <Users className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-orange-700">{stats?.activeUsers || '89'}</div>
                <p className="text-xs text-gray-600 mt-1">
                Healthcare practitioners
                </p>
            </CardContent>
            </Card>

            <Card className="border-2 border-indigo-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">FHIR Resources</CardTitle>
                <FileText className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-indigo-700">{stats?.fhirResources?.toLocaleString() || '2,341'}</div>
                <p className="text-xs text-gray-600 mt-1">
                Generated conditions
                </p>
            </CardContent>
            </Card>

            <Card className="border-2 border-teal-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Systems Active</CardTitle>
                <Activity className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-teal-700">{stats?.systemsActive || '3'}/3</div>
                <p className="text-xs text-gray-600 mt-1">
                Medicine systems online
                </p>
            </CardContent>
            </Card>
        </div>

        {/* Charts and Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Codes Distribution */}
            <Card className="border-2 border-blue-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-800">
                        <PieChart className="h-5 w-5 text-blue-600" />
                        Medical Codes Distribution
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <RechartsPieChart>
                            <Pie
                                data={systemCodesData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => {
                                    const total = systemCodesData.reduce((sum, entry) => sum + entry.codes, 0);
                                    const percent = total ? (typeof value === 'number' ? value : 0) / total : 0;
                                    return `${name}: ${value} (${(percent * 100).toFixed(1)}%)`;
                                }}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="codes"
                            >
                                {systemCodesData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </RechartsPieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Translation Trends */}
            <Card className="border-2 border-green-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-800">
                        <LineChart className="h-5 w-5 text-green-600" />
                        Translation Trends (6 Months)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={translationTrendsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area 
                                type="monotone" 
                                dataKey="success" 
                                stackId="1" 
                                stroke="#10B981" 
                                fill="#10B981" 
                                fillOpacity={0.6}
                                name="Successful"
                            />
                            <Area 
                                type="monotone" 
                                dataKey="failed" 
                                stackId="1" 
                                stroke="#EF4444" 
                                fill="#EF4444" 
                                fillOpacity={0.6}
                                name="Failed"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        {/* Performance and Activity Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* API Performance */}
            <Card className="border-2 border-purple-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-800">
                        <Activity className="h-5 w-5 text-purple-600" />
                        API Performance (24h)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                        <RechartsLineChart data={apiPerformanceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Line 
                                type="monotone" 
                                dataKey="responseTime" 
                                stroke="#8B5CF6" 
                                strokeWidth={2}
                                name="Response Time (ms)"
                            />
                        </RechartsLineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* User Activity */}
            <Card className="border-2 border-orange-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-800">
                        <Users className="h-5 w-5 text-orange-600" />
                        User Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                        <RechartsPieChart>
                            <Pie
                                data={userActivityData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {userActivityData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </RechartsPieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* System Health */}
            <Card className="border-2 border-teal-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-800">
                        <BarChart3 className="h-5 w-5 text-teal-600" />
                        System Health
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={systemHealthData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip formatter={(value) => [`${value}%`, 'Usage']} />
                            <Bar 
                                dataKey="value" 
                                radius={[4, 4, 0, 0]}
                            >
                                {systemHealthData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Translation Volume */}
            <Card className="border-2 border-indigo-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-800">
                        <TrendingUp className="h-5 w-5 text-indigo-600" />
                        Monthly Translation Volume
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={translationTrendsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar 
                                dataKey="translations" 
                                fill="#6366F1" 
                                name="Total Translations"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Request Volume Over Time */}
            <Card className="border-2 border-rose-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-800">
                        <Globe className="h-5 w-5 text-rose-600" />
                        API Request Volume (24h)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={apiPerformanceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Area 
                                type="monotone" 
                                dataKey="requests" 
                                stroke="#F43F5E" 
                                fill="#F43F5E" 
                                fillOpacity={0.6}
                                name="Requests per Hour"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        {/* System Status & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Status */}
            <Card className="border-2 border-gray-200">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                <Activity className="h-5 w-5 text-blue-600" />
                System Status
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                {systemStatus.map((system, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                        {getStatusIcon(system.status)}
                        <div>
                        <p className="font-medium text-gray-900">{system.service}</p>
                        <p className="text-sm text-gray-600">Response: {system.responseTime}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className={getStatusBadge(system.status)}>
                        {system.status.toUpperCase()}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{system.lastCheck}</p>
                    </div>
                    </div>
                ))}
                </div>
            </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-2 border-gray-200">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                <Clock className="h-5 w-5 text-green-600" />
                Recent Activity
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-12 text-center">
                        <span className="text-xs font-medium text-gray-600">{activity.time}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-600">by {activity.user}</p>
                    </div>
                    </div>
                ))}
                </div>
            </CardContent>
            </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-2 border-gray-200">
            <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                Quick Actions
            </CardTitle>
            </CardHeader>
            <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white p-4 h-auto flex-col">
                <Database className="h-6 w-6 mb-2" />
                <span className="text-sm">Upload Codes</span>
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white p-4 h-auto flex-col">
                <Globe className="h-6 w-6 mb-2" />
                <span className="text-sm">Test Translation</span>
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white p-4 h-auto flex-col">
                <FileText className="h-6 w-6 mb-2" />
                <span className="text-sm">View Reports</span>
                </Button>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white p-4 h-auto flex-col">
                <Activity className="h-6 w-6 mb-2" />
                <span className="text-sm">System Health</span>
                </Button>
            </div>
            </CardContent>
        </Card>
        </div>
    );
};

export default Dashboard;
