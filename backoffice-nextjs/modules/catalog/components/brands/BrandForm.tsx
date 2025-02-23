'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import slugify from 'slugify';
import { zodResolver } from '@hookform/resolvers/zod';
import {BrandFormData, brandSchema} from "@/modules/catalog/validations/BrandSchema";
import {cn} from "@/lib/utils";

interface BrandFormProps {
    initialData?: BrandFormData; // Dữ liệu ban đầu cho chế độ "Edit"
    mode: 'create' | 'edit'; // Chế độ: tạo mới hoặc chỉnh sửa
    onSubmit: SubmitHandler<BrandFormData>; // Hàm xử lý khi form submit
}

const BrandForm: React.FC<BrandFormProps> = ({ initialData, mode, onSubmit }) => {
    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        formState: { errors },
    } = useForm<BrandFormData>({
        resolver: zodResolver(brandSchema),
        defaultValues: initialData || {
            name: '',
            slug: '',
            isPublish: true,
        },
    });

    const onNameChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSlug = slugify(event.target.value, { lower: true, strict: true });
        setValue('slug', newSlug);
        await trigger('slug'); // Kiểm tra tính hợp lệ của trường 'slug'
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{mode === 'create' ? 'Create Brand' : 'Edit Brand'}</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block font-medium text-sm text-gray-700">
                            Name
                        </label>
                        <Input
                            id="name"
                            {...register('name', {
                                onChange: onNameChange, // Tự động cập nhật slug khi name thay đổi
                            })}
                            className={cn('mt-1 block w-full', {
                                'border-red-500': errors.name,
                                'border-gray-300': !errors.name,
                            })}
                        />
                        { errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Slug Field */}
                    <div>
                        <label htmlFor="slug" className="block font-medium text-sm text-gray-700">
                            Slug
                        </label>
                        <Input
                            id="slug"
                            {...register('slug')}
                            className={`mt-1 block w-full ${
                                errors.slug ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
                    </div>

                    {/* Publish Field */}
                    <div className="flex items-center space-x-2 mt-2">
                        <Switch
                            id="isPublish"
                            {...register('isPublish')}
                            defaultChecked={initialData?.isPublish || false}
                        />
                        <label htmlFor="isPublish" className="text-sm font-medium text-gray-700">
                            Publish
                        </label>
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-end space-x-4">
                    <Button type="submit" variant="default">
                        {mode === 'create' ? 'Create' : 'Save'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default BrandForm;