import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import organizationService from '../../services/organizationService';
import { toast } from 'react-toastify';
import { 
    MapPinIcon,
    PencilIcon,
    TrashIcon,
    PlusIcon,
    EyeIcon,
    GlobeAltIcon
} from '@heroicons/react/24/outline';

const MarkerManager = () => {
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const queryClient = useQueryClient();

    const { data: organizations = [], isLoading, error } = useQuery({
        queryKey: ['organizations'],
        queryFn: organizationService.getOrganizations
    });

    const deleteMutation = useMutation({
        mutationFn: organizationService.deleteOrganization,
        onSuccess: () => {
            queryClient.invalidateQueries(['organizations']);
            toast.success('Organizasyon başarıyla silindi');
        },
        onError: (error) => {
            toast.error('Organizasyon silinirken hata oluştu');
            console.error('Delete error:', error);
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => organizationService.updateOrganization(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['organizations']);
            setEditingId(null);
            setEditForm({});
            toast.success('Organizasyon başarıyla güncellendi');
        },
        onError: (error) => {
            toast.error('Organizasyon güncellenirken hata oluştu');
            console.error('Update error:', error);
        }
    });

    const handleDelete = async (id, name) => {
        if (window.confirm(`"${name}" organizasyonunu silmek istediğinizden emin misiniz?`)) {
            deleteMutation.mutate(id);
        }
    };

    const handleEdit = (org) => {
        setEditingId(org.id);
        setEditForm({
            name: org.name,
            description: org.description,
            website: org.website || '',
            logoUrl: org.logoUrl || '',
            latitude: org.latitude || '',
            longitude: org.longitude || ''
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
                <p className="text-red-800">Organizasyonlar yüklenirken hata oluştu</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                        <MapPinIcon className="h-7 w-7 mr-3 text-blue-500" />
                        Harita Noktaları Yönetimi
                    </h2>
                    <p className="text-gray-600 mt-1">
                        Haritada görünen organizasyonları yönetin
                    </p>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Yeni Nokta Ekle
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center">
                        <MapPinIcon className="h-8 w-8 text-blue-500" />
                        <div className="ml-3">
                            <p className="text-sm text-gray-600">Toplam Nokta</p>
                            <p className="text-xl font-semibold">{organizations.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center">
                        <GlobeAltIcon className="h-8 w-8 text-green-500" />
                        <div className="ml-3">
                            <p className="text-sm text-gray-600">Konumlu</p>
                            <p className="text-xl font-semibold">
                                {organizations.filter(org => org.latitude && org.longitude).length}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center">
                        <EyeIcon className="h-8 w-8 text-purple-500" />
                        <div className="ml-3">
                            <p className="text-sm text-gray-600">Aktif</p>
                            <p className="text-xl font-semibold">
                                {organizations.filter(org => org.isActive !== false).length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Organizations Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Organizasyonlar</h3>
                </div>
                
                {organizations.length === 0 ? (
                    <div className="p-8 text-center">
                        <MapPinIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Henüz organizasyon bulunmuyor</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Organizasyon
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Açıklama
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Konum
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Website
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {organizations.map((org) => (
                                    <tr key={org.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {editingId === org.id ? (
                                                <input
                                                    type="text"
                                                    value={editForm.name}
                                                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                                />
                                            ) : (
                                                <div className="flex items-center">
                                                    {org.logoUrl ? (
                                                        <img 
                                                            src={org.logoUrl} 
                                                            alt={`${org.name} logo`}
                                                            className="h-8 w-8 rounded-full object-cover mr-3"
                                                        />
                                                    ) : (
                                                        <div className="h-8 w-8 bg-gray-300 rounded-full mr-3"></div>
                                                    )}
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {org.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            ID: {org.id}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {editingId === org.id ? (
                                                <textarea
                                                    value={editForm.description}
                                                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                                    rows="2"
                                                />
                                            ) : (
                                                <div className="text-sm text-gray-900 max-w-xs">
                                                    {org.description}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {editingId === org.id ? (
                                                <div className="space-y-1">
                                                    <input
                                                        type="number"
                                                        step="any"
                                                        placeholder="Enlem"
                                                        value={editForm.latitude}
                                                        onChange={(e) => setEditForm({...editForm, latitude: e.target.value})}
                                                        className="border border-gray-300 rounded px-2 py-1 w-full text-xs"
                                                    />
                                                    <input
                                                        type="number"
                                                        step="any"
                                                        placeholder="Boylam"
                                                        value={editForm.longitude}
                                                        onChange={(e) => setEditForm({...editForm, longitude: e.target.value})}
                                                        className="border border-gray-300 rounded px-2 py-1 w-full text-xs"
                                                    />
                                                </div>
                                            ) : (
                                                <div>
                                                    {org.latitude && org.longitude ? (
                                                        <div className="text-xs">
                                                            <div>Lat: {parseFloat(org.latitude).toFixed(4)}</div>
                                                            <div>Lng: {parseFloat(org.longitude).toFixed(4)}</div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400">Konum yok</span>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {editingId === org.id ? (
                                                <input
                                                    type="url"
                                                    value={editForm.website}
                                                    onChange={(e) => setEditForm({...editForm, website: e.target.value})}
                                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                                    placeholder="https://"
                                                />
                                            ) : (
                                                org.website ? (
                                                    <a 
                                                        href={org.website} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="text-blue-500 hover:text-blue-600"
                                                    >
                                                        Ziyaret Et
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400">-</span>
                                                )
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {editingId === org.id ? (
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
                                                        onClick={() => handleEdit(org)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        <PencilIcon className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(org.id, org.name)}
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

export default MarkerManager;