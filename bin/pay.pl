#!/usr/bin/env perl
#
use Data::Dumper;
use List::Util 'sum';

#print "Payment to the participants\n";

my $path = "/u/soiccuts/cgi-pub/gtoolbar/PHP/results/US";
opendir my $dir, $path or die "Cannot open directory: $!";
my @files = readdir $dir;
closedir $dir;


my $username = "";
my %users = ();
my $num = 0;
my $total = 0;
foreach my $file (@files){
    next if ($file =~ m/^\./);
    if ($file =~ m/raw_.*_data_.*_(.*)_\d+\.json/g){
        $username = $1;
        #print "$username\n";
    }
    if($file =~ m/$username/){
        #print "$username\t$file\n";
        if(exists $users{$username}){
            $users{$username}[0] = $users{$username}[0] + 1; 
        }else{
            $users{$username}[0] = 1;
        }
        if ($file =~ m/raw_site_data_.*\.json/){
            my $tmp =`grep -r Pay $path/$file`;
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
        }
        if ($file =~ m/raw_sis_data_.*\.json/){
            my $tmp2 = `grep -r '"What_is_your_first_name":' $path/$file`;
            chomp($tmp2);
            my ($label, $fname) = split(/:/, $tmp2);
            $fname =~ s/"//g;
            $fname =~ s/,//g;
            $fname =~ s/ //g;
            my $tmp3 = `grep -r '"What_is_your_last_name":' $path/$file`;
            chomp($tmp3);
            my ($label, $lname) = split(/:/, $tmp3);
            $lname =~ s/"//g;
            $lname =~ s/,//g;
            $lname =~ s/ //g;
            $users{$username}[2] = "$fname $lname";
        }
        if ($file =~ m/raw_survey_data_.*\.json/){
            $users{$username}[3] = "\$ ". 2;
            $total = $total + 2;
        }
    }
    $num++;
}

print Dumper(\%users);

#my $value_count = sum values %users;
print "Total files : $num\n";
print "Number of participants: " . (scalar keys %users) . "\n";
print "Total payments: \$ $total\n";
#
#print Dumper(\@files);
my $num_args = $#ARGV + 1;
if($num_args < 1){
    print "\nUsage: ./pay.pl <username>\n";
    exit 1;
}
my $uname = "";
if(exists $ARGV[0]){
    $uname = $ARGV[0];
}
print "\n\nPayment for $uname: " . Dumper($users{$uname}) . "\n\n";
exit 0;
