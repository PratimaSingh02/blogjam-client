import React, { useEffect, useState } from 'react'
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { getAllCategories } from '../../services/category';
import "./categories.css";

export default function Categories({ categories, setCategories = () => { } }) {
    const [categoryOptions, setCategoryOptions] = useState([]);

    useEffect(() => {
        try {
            (async () => {
                const result = await getAllCategories();
                setCategoryOptions(result);
            })()
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleCategoriesChange = (event) => {
        const {
            target: { value },
        } = event;
        setCategories(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <FormControl fullWidth sx={{ marginTop: "1em" }}>
            <InputLabel >Select Categories</InputLabel>
            <Select
                multiple
                value={categories}
                onChange={handleCategoriesChange}
                fullWidth
                input={<OutlinedInput label="Select Categories" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
            >
                {categoryOptions.map((name, index) => (
                    <MenuItem
                        key={index}
                        value={name}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
