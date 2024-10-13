import React, { Ref, useEffect, useState } from "react";
import { Project, resumeData } from "./resumeData";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import resumeTheme from "./resumeTheme";
import { Box, CssBaseline, Divider, Grid2, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography, Card, CardActions, Link } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import Carousel from "react-material-ui-carousel";
import { useTranslation } from "react-i18next";
import CarouselProjectCard from "./CarouselProjectCard";
import generatePDF, { usePDF } from "react-to-pdf";

interface ResumeProps {
  language: 'en' | 'pl';
}
const Resume: React.FC<ResumeProps> = ({ language }) => {
  
  class QueriedData {
    private data = useStaticQuery(graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        avatars: allImageNode(filter: { tags: { eq: "avatar" } }) {
          nodes {
            tags
            childrenImageSharp {
              gatsbyImageData(
                width: 100
                height: 100
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
        projects: allImageNode(filter: { tags: { eq: "project" } }) {
          nodes {
            tags
            childrenImageSharp {
              gatsbyImageData(
                width: 537
                height: 392
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                transformOptions: { cropFocus: SOUTH  }
              )
            }
          }
        }
      }
    `);    

    public getSiteName = (): string => {
      return this.data.site.siteMetadata.title;
    };

    public getAvatarImage = () => {
      const imageNode = this.data.avatars.nodes.find((node: { tags: string[] }) => node.tags.includes("avatar"));

      if (!imageNode) {
        throw new Error(`No avatar found`);
      }

      return imageNode.childrenImageSharp[0].gatsbyImageData;
    };

    public getProjectImage = (searchedImage: Project["title"]): IGatsbyImageData => {
      const imageNode = this.data.projects.nodes.find((node: { tags: string[] }) => node.tags.includes(searchedImage));

      if (!imageNode) {
        throw new Error(`No image found for tag: ${searchedImage}`);
      }

      return imageNode.childrenImageSharp[0].gatsbyImageData;
    };
  }
  const queriedData: QueriedData = new QueriedData();

  //Language switch logic
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  //Printing logic
  const { toPDF, targetRef } = usePDF();
  const [isPrinting, setIsPrinting] = useState<true | false>(false);

  useEffect(() => {
    if (isPrinting) {
        generatePDF(targetRef, {filename: queriedData.getSiteName()});
        setIsPrinting(false); 
    }
  }, [isPrinting, targetRef]); 

  const handlePrint = (): string => {
    setIsPrinting(true);
    return "Exporting to PDF"
  }; 
  
  useEffect(() => {
    window.printPage = handlePrint;
  }, [handlePrint]);

  return (
    <div ref={targetRef}>
      <ThemeProvider theme={resumeTheme}>
        <CssBaseline>
          <Box>
            <Grid2 container spacing={3}>
              {/* Left Column */}
              <Grid2 size={{ xs: 12, md: 5 }}>
                {/* Profile */}
                <Card variant="blackCard" sx={{height: !isPrinting ? '100%' : 1600}}>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", px: 9 }}>
                    {!isPrinting && <GatsbyImage image={queriedData.getAvatarImage()} alt={resumeData.name} style={{ borderRadius: "50%" }} />}
                    <Typography variant="h4" component="div" sx={{mt: 2,textAlign: "center", whiteSpace: { xs: "normal", md: "nowrap" }, mb: isPrinting ? 3 : 0}}>
                      {t('name')}
                    </Typography>
                  </Box>

                  {/* Contact Details */}
                 <Divider sx={{ mt: 2, backgroundColor: 'white' }} />
                  <List component="nav" dense sx={{mt:2}}>
                    {resumeData.contacts.map((contact, index) => (
                      <ListItem key={index}>
                        <ListItemIcon sx={{ color: 'white' }}>
                          <contact.icon />
                        </ListItemIcon>
                        <ListItemText primary={t('contacts.' + index + '.value')} />
                      </ListItem>
                    ))}
                  </List>
                  <Divider sx={{ mt: 2, backgroundColor: 'white' }} />

                  {/* Skills */}
                  <Typography variant="h6" component="div" sx={{ mt: 2, ml: 2 }}>
                    {t('skills.label')}
                  </Typography>

                  <List component="nav" dense sx={{ ml: 5}}>
                    {resumeData.skills.languages.map((languageObj, index) => (
                      <React.Fragment key={index}>
                        <ListItem sx={{ pl: 0 }}> 
                          <ListItemText 
                            primary={t('skills.languages.' + index + '.language')} 
                          />
                        </ListItem>
                        {languageObj.technologies && languageObj.technologies.length > 0 && (
                          <List component="div" dense sx={{ pl: 0, pt: 0 }}>
                            {languageObj.technologies.map((tech, techIndex) => (
                              <ListItem key={techIndex} sx={{ paddingY: '2px' }}>
                                <ListItemText primary={t('skills.languages.' + index + '.technologies.' + techIndex + '.technology')} />
                              </ListItem>
                            ))}
                          </List>
                        )}
                      </React.Fragment>
                    ))}
                  </List>

                  <Divider sx={{ mt: 2, backgroundColor: 'white' }} />

                  {/* Hobbies */}
                  {isPrinting && (<div>
                    <Typography variant="h6" component="div" sx={{ mt: 2, ml: 2 }}>
                      {t('hobbies.label')}
                    </Typography>

                    <List component="nav" dense sx={{ ml: 5}}>
                      {resumeData.hobbies.hobbies.map((hobbyObj, index) => (
                        <React.Fragment key={index}>
                          <ListItem sx={{ pl: 0 }}> 
                            <ListItemText 
                              primary={t('hobbies.hobbies.' + index + '.hobby')} 
                            />
                          </ListItem>
                        </React.Fragment>
                      ))}
                    </List>

                    <Divider sx={{ mt: 2, backgroundColor: 'white' }} />
                    </div>
                  )}

                  {/* Spoken Languages */}
                  {isPrinting && (<div>
                    <Typography variant="h6" component="div" sx={{ mt: 2, ml: 2 }}>
                      {t('spokenLanguages.label')}
                    </Typography>

                    <List component="nav" dense sx={{ ml: 5 }}>
                      {resumeData.spokenLanguages.languages.map((languageObj, index) => (
                        <ListItem key={index} sx={{ pl: 0 }}>
                          <ListItemText 
                            primary={t('spokenLanguages.languages.' + index + '.language')} 
                          />
                        </ListItem>
                      ))}
                    </List>
                  </div>
                )}


                {/* Websites */}
                {!isPrinting && (
                  <CardActions sx={{ justifyContent: 'center', mt: 'auto' }}>  
                    {resumeData.websites.icons.map((site, index) => (
                      <Box key={index} display={"flex"} sx={{ textAlign: 'center', mx: 4, flexDirection: 'column' }}>
                        <IconButton href={site.url} color="primary" sx={{ color: 'white' }}>
                          <site.icon />
                        </IconButton>
                        <Link variant="caption" sx={{ color: 'white'}}  href={site.url}>
                          {t('websites.icons.' + index + '.label')}
                        </Link>
                      </Box>
                    ))}
                  </CardActions>
                )}


                </Card>
              </Grid2>

              {/* Right Column */}
              <Grid2 size={{ xs: 11, md: 7 }} sx={{mt: 2, marginX: 'auto' }}>
                {/* Education */}
                <Card variant="whiteCard">
                  <Typography variant="h6" component="div">
                    {t("education.label")}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {resumeData.education.educations.map((education, index) => (
                      <React.Fragment key={index}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="subtitle1">{t('education.educations.' + index + '.school')}</Typography>
                          <Typography variant="body2" color="text.secondary">{t('education.educations.' + index + '.date')}</Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {t('education.educations.' + index + '.degree')}
                          </Typography>
                        </Box>

                        {index !== resumeData.education.educations.length - 1 && <Divider sx={{ mb: 1 }} />}
                      </React.Fragment>
                    ))}
                  </Box>
                </Card>

                {/* Work Experience */}
                <Card variant="whiteCard">
                  <Typography variant="h6" component="div">
                    {t("experience.label")}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {resumeData.experience.experiences.map((experience, index) => (
                      <React.Fragment key={index}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="subtitle1">{t('experience.experiences.' + index + '.title')}</Typography>
                          <Typography variant="body2" color="text.secondary">{t('experience.experiences.' + index + '.date')}</Typography>

                          {experience.descriptions.map((desc, descIndex) => (
                            <Typography key={descIndex} variant="body2" sx={{ mt: 1 }}>
                              {t(t('experience.experiences.' + index + '.descriptions.' + descIndex + '.description'))}
                            </Typography>
                          ))}
                        </Box>

                        {index !== resumeData.experience.experiences.length - 1 && <Divider sx={{ mb: 2 }} />}
                      </React.Fragment>
                    ))}
                  </Box>
                </Card>

                {/* Projects */}
                {!isPrinting && <Card variant="whiteCard">
                  <Typography variant="h6" component="div">
                    {t("projects.label")}
                  </Typography>

                  <Carousel>
                    {resumeData.projects.projects.map((project, index) => (
                      <CarouselProjectCard
                        key={index}
                        image={queriedData.getProjectImage(project.title)}
                        link={project.link}
                        title={t(`projects.projects.${index}.title`)}
                        description={t(`projects.projects.${index}.description`)}
                      />
                    ))}
                  </Carousel>
                </Card>}
              </Grid2>
            </Grid2>
          </Box>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
};

export default Resume;
