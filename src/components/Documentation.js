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
                        📄 Mailwise Project Documentation
                    </Typography>

                    <Box sx={{ mt: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <PersonIcon sx={{ mr: 1, color: '#1976d2' }} />
                            <Typography variant="h5" fontWeight={600}>🧑‍💻 Who Am I?</Typography>
                        </Box>
                        <Typography paragraph>
                            I am Ömer Faruk Yılmaz, 20 years old, and I have been developing myself in the software field since middle school.
                            I develop applications with modern technologies like React, React Native, and Node.js, and I constantly strive to
                            progress in the professional field. I am currently working as a frontend developer at a startup and
                            continue to create with my individual projects.
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <LightbulbIcon sx={{ mr: 1, color: '#1976d2' }} />
                            <Typography variant="h5" fontWeight={600}>💡 Why Did I Make This Project?</Typography>
                        </Box>
                        <Typography paragraph>
                            The main purpose of developing Mailwise was to introduce my software career to more companies and to make the
                            classic job application process more effective.
                        </Typography>
                        <Typography paragraph>
                            In Turkey, the recruitment processes in the software field are generally passive and ad-oriented.
                            With this system, I am reversing this situation:
                        </Typography>
                        <ul>
                            <li>
                                <Typography>
                                    I want to reach not only the companies with open positions but also those that may potentially be looking for developers.
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                    Instead of visiting each company's career page one by one, I reach the relevant people directly
                                    with personalized bulk emails.
                                </Typography>
                            </li>
                        </ul>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <DatasetIcon sx={{ mr: 1, color: '#1976d2' }} />
                            <Typography variant="h5" fontWeight={600}>📬 Where Do I Find the Data?</Typography>
                        </Box>
                        <Typography paragraph>
                            All contact information and company data used in the system are obtained from apollo.io.
                            Thanks to this platform:
                        </Typography>
                        <ul>
                            <li><Typography>Name, surname, e-mail address, and title of the authorized persons</Typography></li>
                            <li><Typography>Company name, address, industry, and website</Typography></li>
                            <li><Typography>Personal and corporate LinkedIn connections</Typography></li>
                        </ul>
                        <Typography paragraph color="text.secondary" sx={{ mt: 2 }}>
                            📌 Note: All data is collected from publicly available sources and is used for professional communication purposes only.
                            It does not have any commercial advertising, spam, or personal data violation purposes.
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <SystemUpdateAltIcon sx={{ mr: 1, color: '#1976d2' }} />
                            <Typography variant="h5" fontWeight={600}>✉️ How Does the System Work?</Typography>
                        </Box>
                        <Typography paragraph>The Mailwise system works with the following steps:</Typography>
                        <ol>
                            <li>
                                <Typography>
                                    Personal and company information obtained from Apollo.io is saved to the database.
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                    Dynamic e-mail templates are created for each person (name, company, position, etc. information is added).
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                    These e-mails are sent via a mail service determined by the user (e.g., Gmail, SMTP, etc.).
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                    The status of the sent e-mails can be tracked instantly from the system panel.
                                </Typography>
                            </li>
                        </ol>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <BarChartIcon sx={{ mr: 1, color: '#1976d2' }} />
                            <Typography variant="h5" fontWeight={600}>📊 What Information Can Be Viewed?</Typography>
                        </Box>
                        <Typography paragraph>The following information can be accessed from the dashboard:</Typography>
                        <ul>
                            <li><Typography>Total number of e-mails sent</Typography></li>
                            <li><Typography>How many people were sent to</Typography></li>
                            <li><Typography>Status of sent e-mails (Successful, Pending, Error, Replied)</Typography></li>
                            <li><Typography>CV sending history</Typography></li>
                            <li><Typography>Daily e-mail sending graph</Typography></li>
                            <li><Typography>(Soon) Mail open and click rates</Typography></li>
                        </ul>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <EmailIcon sx={{ mr: 1, color: '#1976d2' }} />
                            <Typography variant="h5" fontWeight={600}>📨 How Are E-mail Templates Created?</Typography>
                        </Box>
                        <ul>
                            <li>
                                <Typography>
                                    Information such as company name, recipient name, title, and LinkedIn are automatically added to the template.
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                    The body part contains a professional text introducing the applicant.
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                    The applicant's current CV is sent as an attachment to each mail in PDF format.
                                </Typography>
                            </li>
                        </ul>
                        <Typography paragraph>
                            The templates used in this process are flexible and will be made customizable in the future.
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <SecurityIcon sx={{ mr: 1, color: '#1976d2' }} />
                            <Typography variant="h5" fontWeight={600}>🔐 Privacy Policy & Ethical Approach</Typography>
                        </Box>
                        <Typography paragraph>This system has been developed entirely within ethical and professional limits:</Typography>
                        <ul>
                            <li><Typography>There is no bulk sending of spam or advertising content.</Typography></li>
                            <li><Typography>Each e-mail is created specifically for the recipient and a respectful language is used.</Typography></li>
                            <li><Typography>If desired, an opt-out option can be provided (in a future version).</Typography></li>
                            <li><Typography>All data is used only for the individual application process.</Typography></li>
                        </ul>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <BuildIcon sx={{ mr: 1, color: '#1976d2' }} />
                            <Typography variant="h5" fontWeight={600}>🛠️ Future Plans</Typography>
                        </Box>
                        <Typography paragraph>
                            Mailwise is an actively developed project and the following features will be added soon:
                        </Typography>
                        <ul>
                            <li><Typography>📈 Mail open/click analysis</Typography></li>
                            <li><Typography>🔁 Automatic follow-up e-mails</Typography></li>
                            <li><Typography>🔗 Automatic connection request sending with LinkedIn integration</Typography></li>
                            <li><Typography>📋 Ability to track which companies have viewed the CV with a personal panel</Typography></li>
                            <li><Typography>🧑‍💼 Ability for other developers to use the system with user login</Typography></li>
                            <li><Typography>📤 CSV import and export</Typography></li>
                            <li><Typography>⚙️ SMTP & template settings</Typography></li>
                        </ul>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <InfoIcon sx={{ mr: 1, color: '#1976d2' }} />
                            <Typography variant="h5" fontWeight={600}>🧾 Additional Information</Typography>
                        </Box>
                        <ul>
                            <li><Typography>Frontend: React, Material UI, Recharts</Typography></li>
                            <li><Typography>Backend: Node.js, Express.js, MongoDB</Typography></li>
                            <li><Typography>Mail Service: Nodemailer</Typography></li>
                            <li><Typography>Data Source: Apollo.io</Typography></li>
                            <li><Typography>Authentication: JWT</Typography></li>
                            <li><Typography>Background Process: Worker Threads</Typography></li>
                        </ul>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <ContactMailIcon sx={{ mr: 1, color: '#1976d2' }} />
                            <Typography variant="h5" fontWeight={600}>📬 Contact</Typography>
                        </Box>
                        <Typography><strong>Project Developer:</strong> Ömer Faruk Yılmaz</Typography>
                        <Typography><strong>📧 E-mail:</strong> omer@omerfarukyilmaz.dev</Typography>
                        <Typography><strong>🌐 Personal Website:</strong> omerfarukyilmaz.dev</Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
} 