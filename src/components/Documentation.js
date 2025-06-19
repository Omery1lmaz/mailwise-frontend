import React from 'react';
import { Box, Typography, Paper, Container, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import DatasetIcon from '@mui/icons-material/Dataset';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import EmailIcon from '@mui/icons-material/Email';
import SecurityIcon from '@mui/icons-material/Security';
import BuildIcon from '@mui/icons-material/Build';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';

export default function Documentation() {
    return (
        <Box sx={{ bgcolor: '#f7f8fa', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="md">
                <Paper elevation={1} sx={{ p: 4, borderRadius: 3 }}>
                    <Typography variant="h4" gutterBottom fontWeight={700} color="#1976d2" textAlign="center">
                        📄 Mailwise Proje Dokümantasyonu
                    </Typography>

                    <Box sx={{ mt: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <PersonIcon sx={{ mr: 1, color: '#1976d2' }} />
                            <Typography variant="h5" fontWeight={600}>🧑‍💻 Kimim Ben?</Typography>
                        </Box>
                        <Typography paragraph>
                            Ben Ömer Faruk Yılmaz, 20 yaşındayım ve ortaokuldan bu yana yazılım alanında kendimi geliştiriyorum. 
                            React, React Native, Node.js gibi modern teknolojilerle uygulamalar geliştiriyor, profesyonel alanda 
                            sürekli ilerlemeye çalışıyorum. Halihazırda bir startup'ta frontend developer olarak görev alıyor ve 
                            aynı zamanda bireysel projelerimle üretmeye devam ediyorum.
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <LightbulbIcon sx={{ mr: 1, color: '#1976d2' }} />
                            <Typography variant="h5" fontWeight={600}>💡 Bu Projeyi Neden Yaptım?</Typography>
                        </Box>
                        <Typography paragraph>
                            Mailwise'ı geliştirmemdeki temel amaç, yazılım kariyerimi daha fazla şirkete tanıtmak ve klasik iş 
                            başvurusu sürecini daha etkili bir hale getirmekti.
                        </Typography>
                        <Typography paragraph>
                            Türkiye'de yazılım alanındaki işe alım süreçleri genellikle pasif ve ilan odaklı ilerliyor. 
                            Bu sistemle ben bu durumu tersine çeviriyorum:
                        </Typography>
                        <ul>
                            <li>
                                <Typography>
                                    Sadece açık ilanlara değil, potansiyel olarak yazılımcı arayabilecek şirketlere de ulaşmak istiyorum.
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                    Her şirketin kariyer sayfasını tek tek gezmek yerine, kişiselleştirilmiş toplu e-postalarla 
                                    doğrudan ilgili kişilere ulaşıyorum.
                                </Typography>
                            </li>
                        </ul>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <DatasetIcon sx={{ mr: 1, color: '#1976d2' }} />
                            <Typography variant="h5" fontWeight={600}>📬 Verileri Nereden Buluyorum?</Typography>
                        </Box>
                        <Typography paragraph>
                            Sistemde kullanılan tüm iletişim bilgileri ve şirket verileri, apollo.io üzerinden alınmaktadır. 
                            Bu platform sayesinde:
                        </Typography>
                        <ul>
                            <li><Typography>Yetkili kişilerin adı, soyadı, e-posta adresi ve unvanı</Typography></li>
                            <li><Typography>Şirket adı, adresi, sektörü ve web sitesi</Typography></li>
                            <li><Typography>Kişisel ve kurumsal LinkedIn bağlantıları</Typography></li>
                        </ul>
                        <Typography paragraph color="text.secondary" sx={{ mt: 2 }}>
                            📌 Not: Tüm veriler herkese açık kaynaklardan toplanmakta ve yalnızca profesyonel iletişim amacıyla 
                            kullanılmaktadır. Hiçbir şekilde ticari reklam, spam ya da kişisel veri ihlali amacı taşımamaktadır.
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <SystemUpdateAltIcon sx={{ mr: 1, color: '#1976d2' }} />
                            <Typography variant="h5" fontWeight={600}>✉️ Sistem Nasıl Çalışıyor?</Typography>
                        </Box>
                        <Typography paragraph>Mailwise sistemi aşağıdaki adımlarla çalışmaktadır:</Typography>
                        <ol>
                            <li>
                                <Typography>
                                    Apollo.io üzerinden alınan kişi ve şirket bilgileri veritabanına kaydedilir.
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                    Her kişi için özel olarak dinamik e-posta şablonları oluşturulur (isim, şirket, pozisyon vs. bilgileri eklenir).
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                    Kullanıcının belirlediği bir mail servisi (örn. Gmail, SMTP vb.) üzerinden bu e-postalar gönderilir.
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                    Gönderilen e-postaların durumu sistem panelinden anlık olarak takip edilebilir.
                                </Typography>
                            </li>
                        </ol>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <BarChartIcon sx={{ mr: 1, color: '#1976d2' }} />
                            <Typography variant="h5" fontWeight={600}>📊 Hangi Bilgiler Görüntülenebilir?</Typography>
                        </Box>
                        <Typography paragraph>Dashboard üzerinden aşağıdaki bilgilere ulaşmak mümkündür:</Typography>
                        <ul>
                            <li><Typography>Gönderilen toplam e-posta sayısı</Typography></li>
                            <li><Typography>Kaç kişiye gönderildi</Typography></li>
                            <li><Typography>Gönderilen e-postaların durumu (Başarılı, Beklemede, Hata, Yanıtlandı)</Typography></li>
                            <li><Typography>CV gönderim geçmişi</Typography></li>
                            <li><Typography>Günlük bazda e-posta gönderim grafiği</Typography></li>
                            <li><Typography>(Yakında) Mail açılma ve tıklanma oranları</Typography></li>
                        </ul>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <EmailIcon sx={{ mr: 1, color: '#1976d2' }} />
                            <Typography variant="h5" fontWeight={600}>📨 E-posta Şablonları Nasıl Oluşturuluyor?</Typography>
                        </Box>
                        <ul>
                            <li>
                                <Typography>
                                    Şirket adı, alıcı adı, unvanı ve LinkedIn gibi bilgiler şablona otomatik eklenir.
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                    Gövde kısmında başvuru sahibini tanıtan profesyonel bir metin bulunur.
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                    Her mailin eki olarak başvuru sahibinin güncel CV'si PDF formatında gönderilir.
                                </Typography>
                            </li>
                        </ul>
                        <Typography paragraph>
                            Bu süreçte kullanılan şablonlar esnek olup ileride özelleştirilebilir hale getirilecektir.
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <SecurityIcon sx={{ mr: 1, color: '#1976d2' }} />
                            <Typography variant="h5" fontWeight={600}>🔐 Gizlilik Politikası & Etik Yaklaşım</Typography>
                        </Box>
                        <Typography paragraph>Bu sistem tamamen etik ve profesyonel sınırlar içinde geliştirilmiştir:</Typography>
                        <ul>
                            <li><Typography>Spam veya reklam içerikli toplu gönderim yoktur.</Typography></li>
                            <li><Typography>Her e-posta, alıcıya özel olarak oluşturulur ve saygılı bir dil kullanılır.</Typography></li>
                            <li><Typography>İstenirse opt-out yani iletişimden çıkma imkânı sağlanabilir (gelecek sürümde).</Typography></li>
                            <li><Typography>Tüm veriler yalnızca bireysel başvuru süreci için kullanılır.</Typography></li>
                        </ul>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <BuildIcon sx={{ mr: 1, color: '#1976d2' }} />
                            <Typography variant="h5" fontWeight={600}>🛠️ Gelecek Planları</Typography>
                        </Box>
                        <Typography paragraph>
                            Mailwise aktif olarak geliştirilen bir projedir ve aşağıdaki özellikler yakın zamanda eklenecektir:
                        </Typography>
                        <ul>
                            <li><Typography>📈 Mail açılma / tıklanma analizi</Typography></li>
                            <li><Typography>🔁 Otomatik follow-up e-postaları</Typography></li>
                            <li><Typography>🔗 LinkedIn entegrasyonu ile otomatik bağlantı daveti gönderme</Typography></li>
                            <li><Typography>📋 Kişisel panel ile hangi şirketlerin CV'yi görüntülediğini izleyebilme</Typography></li>
                            <li><Typography>🧑‍💼 Kullanıcı girişi ile başka geliştiricilerin de sistemi kullanabilmesi</Typography></li>
                            <li><Typography>📤 CSV yükleme ve dışa aktarma</Typography></li>
                            <li><Typography>⚙️ SMTP & şablon ayarları</Typography></li>
                        </ul>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <InfoIcon sx={{ mr: 1, color: '#1976d2' }} />
                            <Typography variant="h5" fontWeight={600}>🧾 Ek Bilgiler</Typography>
                        </Box>
                        <ul>
                            <li><Typography>Frontend: React, Material UI, Recharts</Typography></li>
                            <li><Typography>Backend: Node.js, Express.js, MongoDB</Typography></li>
                            <li><Typography>Mail Servisi: Nodemailer</Typography></li>
                            <li><Typography>Veri Kaynağı: Apollo.io</Typography></li>
                            <li><Typography>Kimlik Doğrulama: JWT</Typography></li>
                            <li><Typography>Arka Plan İşlem: Worker Threads</Typography></li>
                        </ul>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <ContactMailIcon sx={{ mr: 1, color: '#1976d2' }} />
                            <Typography variant="h5" fontWeight={600}>📬 İletişim</Typography>
                        </Box>
                        <Typography><strong>Proje Geliştiricisi:</strong> Ömer Faruk Yılmaz</Typography>
                        <Typography><strong>📧 E-posta:</strong> omer@omerfarukyilmaz.dev</Typography>
                        <Typography><strong>🌐 Kişisel Web:</strong> omerfarukyilmaz.dev</Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
} 