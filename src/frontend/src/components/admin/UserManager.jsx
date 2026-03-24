import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import userService from '../../services/userService';
import { toast } from 'react-toastify';
import { 
    UserGroupIcon,
    PencilIcon,
    TrashIcon,
    PlusIcon,
    ShieldCheckIcon,
    UserIcon,
    EnvelopeIcon,
    CalendarIcon
} from '@heroicons/react/24/outline';

const UserManager = () => {
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const queryClient = useQueryClient();

    const { data: users = [], isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: userService.getUsers
    });

    const deleteMutation = useMutation({
        mutationFn: userService.deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
            toast.success('Kullanıcı başarıyla silindi');
        },
        onError: (error) => {
            toast.error('Kullanıcı silinirken hata oluştu');
            console.error('Delete error:', error);
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => userService.updateUser(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
            setEditingId(null);
            setEditForm({});
            toast.success('Kullanıcı başarıyla güncellendi');
        },
        onError: (error) => {
            toast.error('Kullanıcı güncellenirken hata oluştu');
            console.error('Update error:', error);
        }
    });

    const handleDelete = async (id, name) => {
        if (window.confirm(`"${name}" kullanıcısını silmek istediğinizden emin misiniz?`)) {
            deleteMutation.mutate(id);
        }
    };

    const handleEdit = (user) => {
        setEditingId(user.id);
        setEditForm({
            name: user.name,
            email: user.email,
            role: user.role?.name || 'user',
            isActive: user.isActive !== false
        });
    };

    const handleSave = () => {
        updateMutation.mutate({
            id: editingId,
            data: editForm
        });
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditForm({});
    };

    const getRoleBadgeColor = (role) => {
        switch (role?.toLowerCase()) {
            case 'admin':
                return 'bg-red-100 text-red-800';
            case 'moderator':
                return 'bg-yellow-100 text-yellow-800';
            case 'user':
            default:
                return 'bg-green-100 text-green-800';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('tr-TR');
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">Kullanıcılar yüklenirken hata oluştu</p>
            </div>
        );
    }

    const adminUsers = users.filter(user => user.role?.name === 'admin');
    const regularUsers = users.filter(user => user.role?.name !== 'admin');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                        <UserGroupIcon className="h-7 w-7 mr-3 text-blue-500" />
                        Kullanıcı Yönetimi
                    </h2>
                    <p className="text-gray-600 mt-1">
                        Sistem kullanıcılarını yönetin ve rollerini düzenleyin
                    </p>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Yeni Kullanıcı
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center">
                        <UserGroupIcon className="h-8 w-8 text-blue-500" />
                        <div className="ml-3">
                            <p className="text-sm text-gray-600">Toplam Kullanıcı</p>
                            <p className="text-xl font-semibold">{users.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center">
                        <ShieldCheckIcon className="h-8 w-8 text-red-500" />
                        <div className="ml-3">
                            <p className="text-sm text-gray-600">Admin</p>
                            <p className="text-xl font-semibold">{adminUsers.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center">
                        <UserIcon className="h-8 w-8 text-green-500" />
                        <div className="ml-3">
                            <p className="text-sm text-gray-600">Standart</p>
                            <p className="text-xl font-semibold">{regularUsers.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center">
                        <CalendarIcon className="h-8 w-8 text-purple-500" />
                        <div className="ml-3">
                            <p className="text-sm text-gray-600">Aktif</p>
                            <p className="text-xl font-semibold">
                                {users.filter(user => user.isActive !== false).length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Kullanıcılar</h3>
                </div>
                
                {users.length === 0 ? (
                    <div className="p-8 text-center">
                        <UserGroupIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Henüz kullanıcı bulunmuyor</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Kullanıcı
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        E-posta
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Rol
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Durum
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Kayıt Tarihi
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {editingId === user.id ? (
                                                <input
                                                    type="text"
                                                    value={editForm.name}
                                                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                                />
                                            ) : (
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                                                        <UserIcon className="h-6 w-6 text-gray-600" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {user.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            ID: {user.id}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {editingId === user.id ? (
                                                <input
                                                    type="email"
                                                    value={editForm.email}
                                                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                                />
                                            ) : (
                                                <div className="flex items-center text-sm text-gray-900">
                                                    <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
                                                    {user.email}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {editingId === user.id ? (
                                                <select
                                                    value={editForm.role}
                                                    onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                                                    className="border border-gray-300 rounded px-2 py-1"
                                                >
                                                    <option value="user">User</option>
                                                    <option value="moderator">Moderator</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            ) : (
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.role?.name)}`}>
                                                    {user.role?.name || 'user'}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {editingId === user.id ? (
                                                <select
                                                    value={editForm.isActive}
                                                    onChange={(e) => setEditForm({...editForm, isActive: e.target.value === 'true'})}
                                                    className="border border-gray-300 rounded px-2 py-1"
                                                >
                                                    <option value="true">Aktif</option>
                                                    <option value="false">Pasif</option>
                                                </select>
                                            ) : (
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    user.isActive !== false 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {user.isActive !== false ? 'Aktif' : 'Pasif'}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatDate(user.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {editingId === user.id ? (
                                                <div className="space-x-2">
                                                    <button
                                                        onClick={handleSave}
                                                        disabled={updateMutation.isPending}
                                                        className="text-green-600 hover:text-green-900 disabled:opacity-50"
                                                    >
                                                        {updateMutation.isPending ? 'Kaydediliyor...' : 'Kaydet'}
                                                    </button>
                                                    <button
                                                        onClick={handleCancel}
                                                        className="text-gray-600 hover:text-gray-900"
                                                    >
                                                        İptal
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(user)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        <PencilIcon className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(user.id, user.name)}
                                                        disabled={deleteMutation.isPending}
                                                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserManager;