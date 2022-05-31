#!/usr/bin/env perl
#
use Data::Dumper;
use List::Util 'sum';

#print "Payment to the participants\n";
#print Dumper(\@files);
my $num_args = $#ARGV + 1;
if($num_args < 1){
    print "\nUsage: ./analyze.pl <country_code>\n";
    exit 1;
}
my $cty = "";
if(exists $ARGV[0]){
    $cty = $ARGV[0];
}

my $verify = 4;
if(exists $ARGV[1]){
    $verify = $ARGV[1];
}

my $path = "/u/soiccuts/cgi-pub/gtoolbar/PHP/results/$cty";
opendir my $dir, $path or die "Cannot open directory: $!";
my @files = readdir $dir;
closedir $dir;


my $username = "";
my %users = ();
my $num = 0;
my $total = 0;
my %unames = ();
my @filelist = ();
my $female = 0;
my $male = 0;
my $other = 0;
my $total_correct = 0;

foreach my $f (@files){
    next if ($f =~ m/^\./);
    if ($f =~ m/raw_sis_data_.*_(.*)_(\d+)\.json/g){
        $username = $1."_".$2;
    }
    if($f =~ m/$username/){
        $unames{$username} += 1;
    }
    push @filelist, $f;
}

foreach my $ff (@filelist){
    if ($ff =~ m/raw_sis_data_.*_(.*)_(\d+)\.json/g){
        $username = $1."_".$2;
    }
    next if ($username eq "");
    if($ff =~ m/$username/ && $unames{$username} >= $verify){
        if(exists $users{$username}){
            $users{$username}[0] = $users{$username}[0] + 1; 
        }else{
            $users{$username}[0] = 1;
        }
        if ($ff =~ m/raw_site_data_.*\.json/){
            my $tmp =`grep -r Pay $path/$ff`;
            chomp($tmp);
            my ($label, $pay) = split(/:/, $tmp);
            $pay =~ s/"//g;
            $pay =~ s/,//g;
            $pay =~ s/ //g;
            if($pay == ""){
                $pay = 0;
            }
            $users{$username}[1] = "\$ ".$pay;
            $total = $total + $pay;
            my @corrects = `grep -r correct $path/$ff`;
            my $answer_val = 0;
            foreach my $correct (@corrects){
                chomp($correct);
                my ($label, $answer) = split(/:/, $correct);
                $answer =~ s/"//g;
                $answer =~ s/,//g;
                $answer =~ s/ //g;
                $answer_val++ if $answer == 1;
                $total_correct++ if $answer == 1;
            }
            $users{$username}[5] = $answer_val;
            
        }
        if ($ff =~ m/raw_sis_data_.*\.json/){
            my $tmp2 = `grep -r '"What_is_your_first_name":' $path/$ff`;
            chomp($tmp2);
            my ($label, $fname) = split(/:/, $tmp2);
            $fname =~ s/"//g;
            $fname =~ s/,//g;
            $fname =~ s/ //g;
            my $tmp3 = `grep -r '"What_is_your_last_name":' $path/$ff`;
            chomp($tmp3);
            my ($label, $lname) = split(/:/, $tmp3);
            $lname =~ s/"//g;
            $lname =~ s/,//g;
            $lname =~ s/ //g;
            $users{$username}[2] = "$fname $lname";

        }
        if ($ff =~ m/raw_survey_data_.*\.json/){
            $users{$username}[3] = "\$ ". 2;
            $total = $total + 2;
            my $gg = `grep -r '"What_is_your_gender":' $path/$ff`;
            chomp($gg);
            my ($label, $gender) = split(/:/, $gg);
            $gender =~ s/"//g;
            $gender =~ s/,//g;
            $gender =~ s/ //g;
            $users{$username}[4] = $gender;
            $female++  if($gender eq "Female");
            $male++  if($gender eq "Male");
            $other++  if($gender eq "other");
        }
    }
    $num++;
}

print Dumper(\%users);

#my $value_count = sum values %users;
my $n_users = (scalar keys %users);
print "\n\n=============== Analysis for $cty ===============\n";
print "Total files : $num\n";
print "Number of participants: $n_users\n";
print "Gender (F, M, O): ($female, $male, $other)\n";
print "Mean value of total correct answers ($total_correct / $n_users): " . $total_correct/$n_users . "\n";
print "Total payments: \$ $total\n";
print "\n";
#
exit 0;
