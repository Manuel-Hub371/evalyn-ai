import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { useState } from 'react';
import { Building, Users, Shield, Bell, Palette, Key, FileText } from 'lucide-react';

export function Settings() {
  const [companyInfo, setCompanyInfo] = useState({
    name: 'Acme Corporation',
    website: 'https://acme.com',
    industry: 'Technology',
    size: '500-1000',
    address: '123 Business Ave, San Francisco, CA 94105',
  });

  const [notifications, setNotifications] = useState({
    emailNewCandidate: true,
    emailCompletedInterview: true,
    emailWeeklyReport: true,
    emailMonthlyReport: false,
    pushNewCandidate: false,
    pushCompletedInterview: true,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your organization settings and preferences
        </p>
      </div>

      <Tabs defaultValue="company">
        <TabsList>
          <TabsTrigger value="company">
            <Building className="w-4 h-4 mr-2" />
            Company
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="w-4 h-4 mr-2" />
            Users & Roles
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="branding">
            <Palette className="w-4 h-4 mr-2" />
            Branding
          </TabsTrigger>
          <TabsTrigger value="api">
            <Key className="w-4 h-4 mr-2" />
            API & Integration
          </TabsTrigger>
        </TabsList>

        {/* Company Profile */}
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Company Name"
                value={companyInfo.name}
                onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
              />
              <Input
                label="Website"
                type="url"
                value={companyInfo.website}
                onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Industry"
                  value={companyInfo.industry}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, industry: e.target.value })}
                  options={[
                    { value: 'Technology', label: 'Technology' },
                    { value: 'Healthcare', label: 'Healthcare' },
                    { value: 'Finance', label: 'Finance' },
                    { value: 'Education', label: 'Education' },
                    { value: 'Retail', label: 'Retail' },
                    { value: 'Manufacturing', label: 'Manufacturing' },
                    { value: 'Other', label: 'Other' },
                  ]}
                />
                <Select
                  label="Company Size"
                  value={companyInfo.size}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, size: e.target.value })}
                  options={[
                    { value: '1-50', label: '1-50 employees' },
                    { value: '51-200', label: '51-200 employees' },
                    { value: '201-500', label: '201-500 employees' },
                    { value: '500-1000', label: '500-1000 employees' },
                    { value: '1000+', label: '1000+ employees' },
                  ]}
                />
              </div>
              <Textarea
                label="Address"
                value={companyInfo.address}
                onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                rows={3}
              />
              <div className="flex justify-end pt-4">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users & Roles */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Team Members</CardTitle>
                <Button>Invite User</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Sarah Johnson', email: 'sarah@company.com', role: 'Admin', status: 'Active' },
                  { name: 'Michael Chen', email: 'michael@company.com', role: 'Recruiter', status: 'Active' },
                  { name: 'Emma Williams', email: 'emma@company.com', role: 'Hiring Manager', status: 'Active' },
                  { name: 'David Brown', email: 'david@company.com', role: 'Viewer', status: 'Pending' },
                ].map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{user.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{user.role}</span>
                      <span className={`text-sm ${user.status === 'Active' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {user.status}
                      </span>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Roles & Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { role: 'Admin', description: 'Full access to all features and settings', users: 2 },
                  { role: 'Recruiter', description: 'Can manage interviews and candidates', users: 5 },
                  { role: 'Hiring Manager', description: 'Can view reports and candidates', users: 8 },
                  { role: 'Viewer', description: 'Read-only access to reports', users: 3 },
                ].map((role, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-dark-700 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{role.role}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{role.description}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{role.users} users</div>
                    </div>
                    <Button variant="ghost" size="sm">Configure</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Authentication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Switch label="Require two-factor authentication (2FA)" />
                <Switch label="Enforce strong passwords" defaultChecked />
                <Switch label="Auto-logout after inactivity" defaultChecked />
                <Input label="Session timeout (minutes)" type="number" defaultValue="30" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Access Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Switch label="Allow SSO (Single Sign-On)" />
                <Switch label="Restrict access by IP address" />
                <Textarea
                  label="Allowed IP Addresses"
                  placeholder="Enter IP addresses (one per line)"
                  rows={4}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data & Privacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Switch label="Enable audit logging" defaultChecked />
                <Switch label="Encrypt sensitive data at rest" defaultChecked />
                <Select
                  label="Data Retention Period"
                  options={[
                    { value: '30', label: '30 days' },
                    { value: '90', label: '90 days' },
                    { value: '365', label: '1 year' },
                    { value: 'indefinite', label: 'Indefinite' },
                  ]}
                  defaultValue="365"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Switch
                  label="New candidate registration"
                  checked={notifications.emailNewCandidate}
                  onChange={(e) => setNotifications({ ...notifications, emailNewCandidate: e.target.checked })}
                />
                <Switch
                  label="Interview completed"
                  checked={notifications.emailCompletedInterview}
                  onChange={(e) => setNotifications({ ...notifications, emailCompletedInterview: e.target.checked })}
                />
                <Switch
                  label="Weekly summary report"
                  checked={notifications.emailWeeklyReport}
                  onChange={(e) => setNotifications({ ...notifications, emailWeeklyReport: e.target.checked })}
                />
                <Switch
                  label="Monthly analytics report"
                  checked={notifications.emailMonthlyReport}
                  onChange={(e) => setNotifications({ ...notifications, emailMonthlyReport: e.target.checked })}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Switch
                  label="New candidate registration"
                  checked={notifications.pushNewCandidate}
                  onChange={(e) => setNotifications({ ...notifications, pushNewCandidate: e.target.checked })}
                />
                <Switch
                  label="Interview completed"
                  checked={notifications.pushCompletedInterview}
                  onChange={(e) => setNotifications({ ...notifications, pushCompletedInterview: e.target.checked })}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button>Save Preferences</Button>
            </div>
          </div>
        </TabsContent>

        {/* Branding */}
        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle>Brand Customization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Company Logo
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 bg-gray-200 dark:bg-dark-800 rounded-lg flex items-center justify-center">
                    <Building className="w-12 h-12 text-gray-400" />
                  </div>
                  <div>
                    <Button variant="outline">Upload Logo</Button>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      PNG or JPG, max 2MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input type="color" className="w-12 h-10 rounded cursor-pointer" defaultValue="#3b82f6" />
                    <Input defaultValue="#3b82f6" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input type="color" className="w-12 h-10 rounded cursor-pointer" defaultValue="#10b981" />
                    <Input defaultValue="#10b981" />
                  </div>
                </div>
              </div>

              <Textarea
                label="Welcome Message"
                placeholder="Customize the message candidates see when starting an interview..."
                rows={4}
              />

              <div className="flex justify-end pt-4">
                <Button>Save Branding</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API & Integration */}
        <TabsContent value="api">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Production API Key', created: '2024-01-15', lastUsed: '2 hours ago' },
                    { name: 'Development API Key', created: '2024-03-20', lastUsed: '5 days ago' },
                  ].map((key, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-800 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{key.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Created: {key.created} • Last used: {key.lastUsed}
                        </div>
                        <div className="text-xs font-mono text-gray-500 dark:text-gray-500 mt-1">
                          sk_live_••••••••••••••••••••••••••••
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">Rotate</Button>
                        <Button variant="ghost" size="sm" className="text-red-600 dark:text-red-400">
                          Revoke
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline">Generate New API Key</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Webhooks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input label="Webhook URL" placeholder="https://your-domain.com/webhook" />
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Events to subscribe
                  </label>
                  <Switch label="interview.completed" />
                  <Switch label="candidate.scored" />
                  <Switch label="report.generated" />
                </div>
                <Button>Save Webhook</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
