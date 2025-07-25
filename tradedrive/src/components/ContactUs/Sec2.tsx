'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  InputAdornment,
  IconButton,
  useMediaQuery,
  Alert,
  CircularProgress,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SvgIcon from '@mui/material/SvgIcon';
import { useTheme } from '@mui/material/styles';
import { API_ENDPOINTS } from '../../../src/api';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const TikTokIcon = (props: any) => (
  <SvgIcon {...props}>
    <path d="M16.5 3c0 1.38 1.12 2.5 2.5 2.5v3.05c-1.52-.12-2.94-.7-4.1-1.68V14c0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6c.17 0 .34.01.5.03V11c-.17-.03-.33-.05-.5-.05-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V1h3v2z" />
  </SvgIcon>
);

const socialLinks = [
  {
    icon: <FacebookIcon />,
    url: 'https://www.facebook.com/share/1Aqij2UtLv/?mibextid=wwXIfr',
    label: 'Facebook',
  },
  {
    icon: <TikTokIcon />,
    url: 'https://www.tiktok.com/@tradedriveautos?is_from_webapp=1&sender_device=pc',
    label: 'TikTok',
  },
  {
    icon: <YouTubeIcon />,
    url: 'https://www.youtube.com/channel/UCBoErPVRb1tayHjIz2DKM8g',
    label: 'YouTube',
  },
];

export default function Sec2() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State for form fields, errors, and submission status
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: '',
      email: '',
      phone: '',
      message: '',
    };
    let isValid = true;

    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\+?\d{7,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear specific field error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: '' }));
    // Clear submission error/success messages
    setError('');
    setSuccess('');
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(API_ENDPOINTS.contactUs, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit form');
      }

      setSuccess('Your message has been successfully sent!');
      setFormData({ name: '', email: '', phone: '', message: '' }); // Reset form
      setErrors({ name: '', email: '', phone: '', message: '' }); // Reset errors
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, py: { xs: 4, sm: 6 } }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 4,
          p: { md: 5 },
          px: { md: 20 },
        }}
      >
        {/* Left Column - Contact Form */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
            CONTACT FORM
          </Typography>

          {/* Display success or error messages */}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="standard"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              variant="standard"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              variant="standard"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              variant="standard"
              placeholder="How can we help you? Feel free to get in touch!"
              name="message"
              value={formData.message}
              onChange={handleChange}
              error={!!errors.message}
              helperText={errors.message}
              multiline
              rows={3}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Button
              variant="contained"
              color="error"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
              type="submit"
              disabled={loading}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 0,
              }}
            >
              {loading ? 'Submitting...' : 'GET IN TOUCH'}
            </Button>
          </form>
        </Box>

        {/* Right Column - Contact Info */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: 2,
            px: { xs: 1, sm: 4 },
            textAlign: 'left',
          }}
        >
          <Typography variant="subtitle2" sx={{ letterSpacing: 1, fontWeight: 600 }}>
            CONTACT US
          </Typography>

          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            HAVE QUESTIONS?
            <br />
            GET IN TOUCH!
          </Typography>

          <Typography variant="body1" color="text.secondary">
            50F,Sunderland Rd,
            <br />
            Sandy SG19 1QY
            <br />
            tradedriveautos@gmail.com
          </Typography>

          <Typography variant="body1" sx={{ fontWeight: 700, mt: 1 }}>
            075 555 94947
          </Typography>

          {/* Social Icons */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              gap: 1.5,
              mt: 2,
            }}
          >
            {socialLinks.map(({ icon, url, label }, i) => (
              <IconButton
                key={i}
                component="a"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                sx={{
                  border: '1px solid #000',
                  width: 40,
                  height: 40,
                  borderRadius: 0,
                  color: '#000',
                }}
              >
                {icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}