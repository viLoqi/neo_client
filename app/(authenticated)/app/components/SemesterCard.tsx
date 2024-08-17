import { Card, Text, Heading, CardBody, CardFooter, Button, Center, Box, Badge } from "@chakra-ui/react";
import { BookBookmark, Student, Timer } from "@phosphor-icons/react";

interface SemesterCardProps {
    title: string;
    students: number;
    duration: string;
    year: string;
    status?: string;
    icon: any;
}

const SemesterCard: React.FC<SemesterCardProps> = ({ title, students, duration, year, status = "Pending", icon }) => {
    const getStatusStyles = () => {
        switch (status) {
            case "Completed":
                return {
                    bgColor: "#E4FAEF",  
                    textColor: "#1A7A5E", 
                    borderColor: "#B0E0CC" 
                };
            case "Active":
                return {
                    bgColor: "#D1ECF1",  
                    textColor: "#31708E", 
                    borderColor: "#A3CFD9" 
                };
            case "Pending":
                return {
                    bgColor: "#FFF7C2",  
                    textColor: "#946800",
                    borderColor: "#F5D90A" 
                };
            default:
                return {
                    bgColor: "#FFF",      
                    textColor: "#000",    
                    borderColor: "#000"  
                };
        }
    };

    const { bgColor, textColor, borderColor } = getStatusStyles();

    return (
        <Card
            overflow='hidden'
            borderRadius="xl"
            boxShadow="lg"
            backgroundColor="white"
            width="272.67px"
            height="296px"
            p={2}
            m={2}
        >
            <Box textAlign="center" mb={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                <Box as={icon} boxSize="95px" color="gray.600" mb={2} />

                <Badge
                    bg={bgColor}
                    border={`1px solid ${borderColor}`}
                    borderRadius="full"
                    px={3}
                    py={1}
                    mb={2}
                    fontSize="12px"
                    lineHeight="16px"
                    fontWeight="400"
                    color={textColor}
                    fontFamily="Satoshi, sans-serif"
                >
                    {status?.toUpperCase()}
                </Badge>

                <Heading size='md' fontWeight="bold" mb={2}>{title}</Heading>

                <CardBody textAlign="center" p={0} pt={0} display="flex" flexDirection="column" justifyContent="center" flex="1">
                    <div className="grid grid-cols-3 items-center gap-1">
                        <Text display="flex" alignItems="center" justifyContent="center" gap={1} fontSize="sm">
                            <Student size={18} /> <span>{students}</span>
                        </Text>
                        <Text display="flex" alignItems="center" justifyContent="center" gap={1} fontSize="sm">
                            <Timer size={18} /> <span>{duration}</span>
                        </Text>
                        <Text fontSize="sm">
                            {year}
                        </Text>
                    </div>
                </CardBody>

                <CardFooter justifyContent="center" p={0} pt={2}>
                    <Button variant='solid' color='#326AFD' bgColor={"#DDEAFF"} width="90%" height="44px" fontSize="md" borderRadius="full" px={6}>
                        Join Now
                    </Button>
                </CardFooter>
            </Box>
        </Card>
    );
};

export default SemesterCard;
