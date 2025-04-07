'use client';
import React, { useState } from 'react';
import Link from 'next/link';
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
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Paper 
} from '@mui/material';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LabelIcon from '@mui/icons-material/Label';
import MenuIcon from '@mui/icons-material/Menu';

interface Collection {
  id: number;
  name: string;
  category: string;
  salesChannel: string;
  
}

const collections: Collection[] = [
  { id: 1, name: 'Koleksiyon - 1', category: 'Ürün Renk Bilgisi Güneş Epi Mor', salesChannel: 'Satış Kanalı - 1' },
  { id: 2, name: 'Koleksiyon - 2', category: 'Ürün Renk Bilgisi Güneş San', salesChannel: 'Satış Kanalı - 1' },
  { id: 3, name: 'Koleksiyon - 3', category: 'Ürün Renk Bilgisi Güneş Fuşya', salesChannel: 'Satış Kanalı - 2' },
  { id: 4, name: 'Koleksiyon - 4', category: 'Ürün Bedeni Bilgisi Güneş 44', salesChannel: 'Satış Kanalı - 2' },
  { id: 5, name: 'Koleksiyon - 5', category: 'Ürün Renk Bilgisi Güneş 320 İndirim Deneme', salesChannel: 'Satış Kanalı - 3' },
];

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
          { text: 'Dashboard', icon: <HomeIcon /> },
          { text: 'Ürünler', icon: <StoreIcon /> },
          { text: 'Satış', icon: <ShoppingCartIcon /> },
          { text: 'Koleksiyon', icon: <LabelIcon /> },
        ].map((item) => (
          <ListItem 
            key={item.text} >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 'auto', p: 1 }}>
        <ListItem>
          <ListItemIcon>
            <MenuIcon />
          </ListItemIcon>
          <ListItemText primary="Koleksiyon" />
        </ListItem>
      </Box>
    </Drawer>
  );
};

const Navbar: React.FC<{ darkMode: boolean; onToggleDarkMode: () => void }> = ({ darkMode, onToggleDarkMode }) => {
  const handleLanguageClick = () => alert('Dil değiştirme seçildi!');
  const handleNotificationsClick = () => alert('Bildirimlere gidildi!');
  const handleMessagesClick = () => alert('Mesajlara gidildi!');
  const handleProfileClick = () => alert('Profil ayarlarına gidildi!');
 

  return (
    <AppBar position="static" color="default" elevation={1} sx={{ backgroundColor: '#f5f5f5' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#000' }}>
          Koleksiyon - Sabit Düzenleme
        </Typography>
        <IconButton color="inherit" onClick={onToggleDarkMode}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <IconButton color="inherit">
          <Brightness4Icon />
        </IconButton>
        <IconButton color="inherit" onClick={handleLanguageClick}>
          <LanguageIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleNotificationsClick}>
          <NotificationsIcon />
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

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    alert(`Karanlık mod ${!darkMode ? 'açıldı' : 'kapatıldı'}`);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#fff' }}>
      <Sidebar open={true} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Navbar darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />
        <Typography variant="h6" gutterBottom sx={{ mt: 2, color: '#000' }}>
          Koleksiyon
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Koleksiyon Listesi
        </Typography>
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Başlık</TableCell>
                <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Ürün Kategorileri</TableCell>
                <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Satış Kanalları</TableCell>
                <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>İşlemler</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
            {collections.map((collection) => (
              <TableRow key={collection.id}>
                <TableCell>{collection.name}</TableCell>
                <TableCell>{collection.category}</TableCell>
                <TableCell>{collection.salesChannel}</TableCell>
                <TableCell>
                  <Link href={`/edit/${collection.id}`} passHref>
                    <IconButton aria-label="edit" size="small">
                      <MenuIcon />
                    </IconButton>
                  </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Box>
  );
};

export default App;