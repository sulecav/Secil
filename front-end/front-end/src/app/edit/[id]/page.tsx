'use client';
import React, { useState } from 'react';


import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Paper,
  Button,
  InputBase,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@mui/material';
import {
  Home as HomeIcon,
  Store as StoreIcon,
  ShoppingCart as ShoppingCartIcon,
  Label as LabelIcon,
  Menu as MenuIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Language as LanguageIcon,
  Notifications as NotificationsIcon,
  Mail as MailIcon,
  AccountCircle as AccountCircleIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;

  
}

interface Collection {
  id: number;
  name: string;
  productCount: number;
  products: Product[];
}

interface Filters {
  category: string;
  stockStatus: string;
  productCode: string;
  minStock: string;
  maxStock: string;
  showLowStock: boolean;
}





const collection: Collection = {
  id: 1,
  name: 'Koleksiyon - 1',
  productCount: 5,
  products: [
    { id: '12345678', name: 'Elbise'},
    { id: '12345679', name: 'Pantolon'},
    { id: '12345680', name: 'Ceket' },
    { id: '12345681', name: 'Elbise' },
    { id: '12345682', name: 'Elbise' },
  ],
};

const Sidebar: React.FC<{ open: boolean }> = ({ open }) => {
  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', backgroundColor: '#f5f5f5' },
      }}
    >
      <Box sx={{ p: 2, textAlign: 'center', backgroundColor: '#e0e0e0' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '24px' }}>
          
        </Typography>
      </Box>
      <List>
        {[
          { text: 'Dashboard', icon: <HomeIcon />, path: '/dashboard' },
          { text: 'Ürünler', icon: <StoreIcon />, path: '/products' },
          { text: 'Satış', icon: <ShoppingCartIcon />, path: '/sales' },
          { text: 'Koleksiyon', icon: <LabelIcon />, path: '/collections' },
        ].map((item) => (
          <ListItem key={item.text} component={Link} href={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

const Navbar: React.FC = () => {
  const handleToggleDarkMode = () => alert('Karanlık mod değiştirildi!');
  const handleLanguageClick = () => alert('Dil değiştirme seçildi!');
  const handleNotificationsClick = () => alert('Bildirimlere gidildi!');
  const handleMessagesClick = () => alert('Mesajlara gidildi!');
  const handleProfileClick = () => alert('Profil ayarlarına gidildi!');

  const imageUrl: string = 'https://cdn.secilstore.com/docs/images/product/orj/10002421211006/0015/1.webp?x=kyvrb';



  return (
    <AppBar position="static" color="default" elevation={1} sx={{ backgroundColor: '#f5f5f5' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#000' }}>
          Koleksiyon - Sabit Düzenleme
        </Typography>
        <IconButton color="inherit" onClick={handleToggleDarkMode}>
          <Brightness7Icon />
        </IconButton>
        <IconButton color="inherit">
          <Brightness4Icon />
        </IconButton>
        <IconButton color="inherit" onClick={handleLanguageClick}>
          <LanguageIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleNotificationsClick}>
          <NotificationsIcon badgeContent={12} color="error" />
        </IconButton>
        <IconButton color="inherit" onClick={handleMessagesClick}>
          <MailIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleProfileClick}>
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default function EditCollection({ params }: { params: { id: string } }) {
  const [filters, setFilters] = useState<Filters>({
    category: '',
    stockStatus: '',
    productCode: '',
    minStock: '',
    maxStock: '',
    showLowStock: false,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [openFilter, setOpenFilter] = useState(false); // Yeni state için filtre paneli aç/kapa

  const handleFilterChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterSubmit = () => {
    console.log('Filters:', filters);
    console.log('Search Query:', searchQuery);
    setOpenFilter(false); // Filtre panelini kapat
  };

  const handleSave = () => {
    alert('Değişiklikler kaydedildi!');
  };

  const handleCancel = () => {
    alert('Değişiklikler iptal edildi!');
  };

  const toggleFilterDrawer = () => {
    setOpenFilter(!openFilter);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar open={true} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Navbar />
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Sabitler Düzenleme
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Koleksiyon - {collection.productCount} Ürün
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <InputBase
              placeholder="Koleksiyon Ara..."
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ ml: 1, flex: 1, border: '1px solid #ccc', borderRadius: 1, p: 1 }}
            />
            <IconButton sx={{ ml: 1 }} onClick={toggleFilterDrawer}>
              <FilterListIcon />
            </IconButton>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Koleksiyon Ürünleri
                </Typography>
                <Grid container spacing={2}>
                  {collection.products.map((product) => (
                    <Grid item xs={4} key={product.id}>
                      <Paper
                        sx={{
                          p: 1,
                          textAlign: 'center',
                          height: 200,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        
                        <Typography variant="body2"></Typography>
                        <Typography variant="body2">{product.name}</Typography>
                        <Typography variant="caption">{product.id}</Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Sabitler
                </Typography>
                <Grid container spacing={2}>
                  {Array.from({ length: 6 }, (_, i) => (
                    <Grid item xs={4} key={i}>
                      <Paper
                        sx={{
                          p: 1,
                          height: 100,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#e0e0e0',
                        }}
                      >
                        <Typography variant="body2">[Sabit Yer Tutucu]</Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="contained" color="secondary" onClick={handleCancel}>
              Vazgeç
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Kaydet
            </Button>
          </Box>
        </Box>

        {/* Filtre Drawer */}
        <Drawer anchor="right" open={openFilter} onClose={toggleFilterDrawer}>
          <Box sx={{ width: 300, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Filtreler
            </Typography>
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Kategoriler</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  label="Kategoriler"
                >
                  <MenuItem value="">Seçiniz</MenuItem>
                  <MenuItem value="electronics">Elektronik</MenuItem>
                  <MenuItem value="clothing">Giyim</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="stock-status-label">Stok</InputLabel>
                <Select
                  labelId="stock-status-label"
                  name="stockStatus"
                  value={filters.stockStatus}
                  onChange={handleFilterChange}
                  label="Stok"
                >
                  <MenuItem value="">Seçiniz</MenuItem>
                  <MenuItem value="in-stock">Stokta Var</MenuItem>
                  <MenuItem value="out-of-stock">Stokta Yok</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Ürün Kodu"
                name="productCode"
                value={filters.productCode}
                onChange={handleFilterChange}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Minimum Stok"
                name="minStock"
                type="number"
                value={filters.minStock}
                onChange={handleFilterChange}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Maksimum Stok"
                name="maxStock"
                type="number"
                value={filters.maxStock}
                onChange={handleFilterChange}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="showLowStock"
                    checked={filters.showLowStock}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Tüm Düşük Stokları Göster"
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleFilterSubmit}>
                Uygula
              </Button>
              <Button variant="outlined" onClick={toggleFilterDrawer}>
                İptal
              </Button>
            </Box>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
}