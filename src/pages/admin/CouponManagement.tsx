import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllCoupons, deactivateCoupon, activateCoupon, createCoupon } from "../../api/couponAPI";

interface Coupon {
    id: string;
    code: string;
    discount: number;
    active: boolean;
}

const CouponManagement = () => {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [newCoupon, setNewCoupon] = useState({
        code: "",
        discountType: "porcentaje", // Default type
        value: 0,
        maxUses: 1,
        validFrom: "",
        validUntil: "",
    });

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const token = localStorage.getItem("token") || "";
                const data = await getAllCoupons(token);

                // Mapeamos para asegurar que tengan formato correcto
                const formattedCoupons = data.map((coupon: any) => ({
                    id: coupon.id || coupon._id, // soporte para MongoDB (_id)
                    code: coupon.code,
                    discount: coupon.discount,
                    active: coupon.active,
                }));

                setCoupons(formattedCoupons);
            } catch (error) {
                console.error("Error al cargar cupones:", error);
                toast.error("Error al cargar los cupones.");
            }
        };

        fetchCoupons();
    }, []);

    const handleDeactivateCoupon = async (id: string) => {
        try {
            const token = localStorage.getItem("token") || "";
            await deactivateCoupon(id, token);
            setCoupons((prevCoupons) =>
                prevCoupons.map((coupon) =>
                    coupon.id === id ? { ...coupon, active: false } : coupon
                )
            );
            toast.success("Cupón desactivado exitosamente.");
        } catch (error) {
            console.error("Error al desactivar cupón:", error);
            toast.error("Error al desactivar el cupón.");
        }
    };

    const handleActivateCoupon = async (id: string) => {
        try {
            const token = localStorage.getItem("token") || "";
            await activateCoupon(id, token);
            setCoupons((prevCoupons) =>
                prevCoupons.map((coupon) =>
                    coupon.id === id ? { ...coupon, active: true } : coupon
                )
            );
            toast.success("Cupón activado exitosamente.");
        } catch (error) {
            console.error("Error al activar cupón:", error);
            toast.error("Error al activar el cupón.");
        }
    };

    const handleCreateCoupon = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem("token") || "";
            const response = await createCoupon(newCoupon, token);
            setCoupons([response, ...coupons]);
            toast.success("Cupón creado exitosamente.");
            setNewCoupon({
                code: "",
                discountType: "percentage",
                value: 0,
                maxUses: 1,
                validFrom: "",
                validUntil: "",
            });
        } catch (error) {
            console.error("Error al crear cupon:", error);
            toast.error("Error al crear el cupón.");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewCoupon((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-blue-600 text-2xl">Gestión de Cupones</h2>

            {/* Formulario para crear un nuevo cupón */}
            <form onSubmit={handleCreateCoupon} className="space-y-4 bg-black p-6 shadow sm:rounded-lg">
                <h3 className="text-lg font-medium">Crear nuevo cupón</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                            Código
                        </label>
                        <input
                            type="text"
                            id="code"
                            name="code"
                            value={newCoupon.code}
                            onChange={handleInputChange}
                            required
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="discountType" className="block text-sm font-medium text-gray-700">
                            Tipo de descuento
                        </label>
                        <select
                            id="discountType"
                            name="discountType"
                            value={newCoupon.discountType}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        >
                            <option value="porcentaje">Porcentaje</option>
                            <option value="fixed">Fijo</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                            Valor del descuento
                        </label>
                        <input
                            type="number"
                            id="value"
                            name="value"
                            value={newCoupon.value}
                            onChange={handleInputChange}
                            required
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="maxUses" className="block text-sm font-medium text-gray-700">
                            Número máximo de usos
                        </label>
                        <input
                            type="number"
                            id="maxUses"
                            name="maxUses"
                            value={newCoupon.maxUses}
                            onChange={handleInputChange}
                            required
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="validFrom" className="block text-sm font-medium text-gray-700">
                            Válido desde
                        </label>
                        <input
                            type="date"
                            id="validFrom"
                            name="validFrom"
                            value={newCoupon.validFrom}
                            onChange={handleInputChange}
                            required
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="validUntil" className="block text-sm font-medium text-gray-700">
                            Válido hasta
                        </label>
                        <input
                            type="date"
                            id="validUntil"
                            name="validUntil"
                            value={newCoupon.validUntil}
                            onChange={handleInputChange}
                            required
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Crear Cupón
                </button>
            </form>

            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Código
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Descuento
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                        </th>
                        <th className="px-6 py-3"></th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {coupons.map((coupon) => (
                        <tr key={coupon.id}>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                {coupon.code}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                {coupon.discount}%
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                {coupon.active ? "Activo" : "Inactivo"}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium">
                                {coupon.active ? (
                                    <button
                                        onClick={() => handleDeactivateCoupon(coupon.id)}
                                        className="text-sm text-red-600 hover:text-red-800"
                                    >
                                        Desactivar
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleActivateCoupon(coupon.id)}
                                        className="text-sm text-green-600 hover:text-green-800"
                                    >
                                        Activar
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CouponManagement;