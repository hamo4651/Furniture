import { usePage, useForm } from '@inertiajs/react';
import axios from 'axios';
import Master from '../Master';

export default function Edit() {
    const { product, categories } = usePage().props;

    const { data, setData, put, errors } = useForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        quantity: product.quantity || '',
        status: product.status || 'instock',
        category_id: product.category_id || '',
        new_images: null, // الحقل الخاص بإضافة الصور الجديدة
    });



    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     // تحديث الحقول النصية باستخدام Inertia
    //     put(route('admin.product.update', { product: product.id }), {
    //         onSuccess: () => {
    //             alert('Product updated successfully!');
    //         },
    //     });

    //     // رفع الصور باستخدام FormData
    //     if (data.new_images) {
    //         const formData = new FormData();

    //         Array.from(data.new_images).forEach((file) => {
    //             formData.append('images[]', file); // رفع الصور كمصفوفة
    //         });

    //         axios
    //             .put(route('admin.product.update', { product: product.id }), formData, {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                 },
    //             })
    //             .then(() => {
    //                 alert('Images uploaded successfully!');
    //                 location.reload(); // تحديث الصفحة بعد رفع الصور
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //                 alert('Error uploading images.');
    //             });
    //     }
    // };

    // حذف صورة معينة

    const handleSubmit = (e) => {
        e.preventDefault();

        // تحديث الحقول النصية باستخدام Inertia
        put(route('admin.product.update', { product: product.id }), {
            onSuccess: () => {
                alert('Product updated successfully!');
            },
        });

        // رفع الصور باستخدام POST
        if (data.new_images) {
            const formData = new FormData();

            Array.from(data.new_images).forEach((file) => {
                formData.append('images[]', file);
            });

            axios
                .post(route('admin.product.uploadImages', { product: product.id }), formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(() => {
                    alert('Images uploaded successfully!');
                    location.reload(); // تحديث الصفحة بعد رفع الصور
                })
                .catch((error) => {
                    console.error(error);
                    alert('Error uploading images.');
                });
        }
    };


    const handleDeleteImage = (imageId) => {
        if (confirm('Are you sure you want to delete this image?')) {
            axios
                .delete(route('admin.product.image.destroy', { image: imageId }))
                .then((response) => {
                    alert(response.data.message);
                    // تحديث الصور بعد الحذف
                    const updatedImages = product.images.filter((image) => image.id !== imageId);
                    product.images = updatedImages; // تحديث البيانات محليًا

                    window.location.reload();
                })
                .catch((error) => {
                    console.error(error);
                    alert('Error deleting image.');
                });
        }
    };

    return (
        <Master>
            <h1 className="text-3xl font-bold text-center">Edit Product</h1>

            <div className="container bg-light my-4 p-4">
                {/* نموذج تعديل المنتج */}
                <form onSubmit={handleSubmit} >
                    {/* اسم المنتج */}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    {/* وصف المنتج */}
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            id="description"
                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        ></textarea>
                        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                    </div>

                    {/* سعر المنتج */}
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                        />
                        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                    </div>

                    {/* كمية المنتج */}
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                            value={data.quantity}
                            onChange={(e) => setData('quantity', e.target.value)}
                        />
                        {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
                    </div>

                    {/* حالة المنتج */}
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">
                            Status
                        </label>
                        <select
                            id="status"
                            className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                        >
                            <option value="instock">In Stock</option>
                            <option value="outofstock">Out of Stock</option>
                        </select>
                        {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                    </div>

                    {/* تصنيف المنتج */}
                    <div className="mb-3">
                        <label htmlFor="category_id" className="form-label">
                            Category
                        </label>
                        <select
                            id="category_id"
                            className={`form-select ${errors.category_id ? 'is-invalid' : ''}`}
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && <div className="invalid-feedback">{errors.category_id}</div>}
                    </div>

                    {/* رفع صور جديدة */}
                    <div className="mb-3">
                        <label htmlFor="images" className="form-label">
                            Add New Images
                        </label>
                        <input
                            type="file"
                            id="images"
                            className="form-control"
                            multiple
                            onChange={(e) => setData('new_images', e.target.files)}
                        />
                        {errors.new_images && <div className="invalid-feedback">{errors.new_images}</div>}
                    </div>

                    {/* زر تحديث المنتج */}
                    <button type="submit" className="btn btn-primary">
                        Update Product
                    </button>
                </form>

                {/* عرض الصور المرفوعة */}
                <div className="mb-3">
                    <h5>Uploaded Images:</h5>
                    <div className="d-flex flex-wrap">
                        {product.images.map((image) => (
                            <div key={image.id} className="position-relative m-2">
                                <img
                                    src={`http://127.0.0.1:8000/images/product_image/${image.image}`}
                                    alt="Product Image"
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                    onClick={() => handleDeleteImage(image.id)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Master>
    );
}
